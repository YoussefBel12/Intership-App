using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

using Intership.Application.DTOs;
using Intership.Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;

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
    }
}