using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

using Intership.Application.DTOs;
using Intership.Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;

namespace Intership.API.Controllers
{
    [Route("api/interns")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
    public class InternsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly UserManager<ApplicationUser> _userManager;

        public InternsController(IMediator mediator, UserManager<ApplicationUser> userManager)
        {
            _mediator = mediator;
            _userManager = userManager;
        }

        [HttpPut("{internId}/assign-supervisor")]
        public async Task<IActionResult> AssignSupervisor(string internId, [FromBody] AssignSupervisorDto dto)
        {
            // 🔹 Validate if the user is an intern
            var internUser = await _userManager.FindByIdAsync(internId);
            if (internUser == null)
            {
                return NotFound("Intern user not found.");
            }

            var internRoles = await _userManager.GetRolesAsync(internUser);
            if (!internRoles.Contains("intern"))
            {
                return BadRequest("User must be an intern before assigning a supervisor.");
            }

            // 🔹 Validate if the supervisor exists and has the supervisor role
            var supervisorUser = await _userManager.FindByIdAsync(dto.SupervisorId);
            if (supervisorUser == null)
            {
                return NotFound("Supervisor user not found.");
            }

            var supervisorRoles = await _userManager.GetRolesAsync(supervisorUser);
            if (!supervisorRoles.Contains("supervisor"))
            {
                return BadRequest("The selected user is not a valid supervisor.");
            }

            // 🔹 Assign the supervisor
            var command = new AssignSupervisorCommand { InternId = internId, SupervisorId = dto.SupervisorId };
            await _mediator.Send(command);

            return Ok("Supervisor assigned successfully.");
        }


/*
        [HttpGet("list-users")]

        public async Task<IActionResult> ListUsersByRole(string role)
        {
            // Fetch users in the specified role
            var users = await _userManager.GetUsersInRoleAsync(role);

            var usersWithRoles = new List<object>();

            // Fetch roles for each user sequentially
            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                usersWithRoles.Add(new
                {
                    user.Id,
                    user.FirstName,
                    user.LastName,
                    user.Email,
                    Roles = roles.Any() ? roles : new string[] { } // Handle users without roles
                });
            }

            return Ok(usersWithRoles);
        }
*/
        [HttpGet("list-supervisors")]
        public async Task<IActionResult> ListSupervisors()
        {
            // Fetch users in the supervisor role
            var supervisors = await _userManager.GetUsersInRoleAsync("supervisor");

            var supervisorsWithDetails = supervisors.Select(supervisor => new
            {
                supervisor.Id,
                supervisor.FirstName,
                supervisor.LastName,
                supervisor.Email
            }).ToList();

            return Ok(supervisorsWithDetails);
        }

        [HttpGet("list-interns")]
        public async Task<IActionResult> ListInterns()
        {
            // Fetch users in the intern role
            var interns = await _userManager.GetUsersInRoleAsync("intern");

            var internsWithDetails = interns.Select(intern => new
            {
                intern.Id,
                intern.FirstName,
                intern.LastName,
                intern.Email
            }).ToList();

            return Ok(internsWithDetails);
        }

    }
}