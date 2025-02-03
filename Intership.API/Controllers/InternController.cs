using Intership.Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Intership.API.Controllers
{
    [Route("api/interns")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "intern")]
    public class InternController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public InternController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        // New endpoint to get the supervisor assigned to an intern
        [HttpGet("supervisor")]
        public async Task<IActionResult> GetSupervisor()
        {
            // Get the currently logged-in intern
            var internId = _userManager.GetUserId(User);
            var intern = await _userManager.FindByIdAsync(internId);

            if (intern == null)
            {
                return Unauthorized("Intern not found.");
            }

            // Fetch the supervisor assigned to this intern
            var supervisor = await _userManager.FindByIdAsync(intern.SupervisorId);

            if (supervisor == null)
            {
                return NotFound("Supervisor not found.");
            }

            return Ok(new
            {
                supervisor.UserName,
                supervisor.Email,
                supervisor.FirstName,
                supervisor.LastName
            });
        }
    }
}
