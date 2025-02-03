using Intership.Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Intership.API.Controllers
{
    [Route("api/supervisors")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "supervisor")]
    public class SupervisorsController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public SupervisorsController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("interns")]
        public async Task<IActionResult> GetSupervisedInterns()
        {
            // 🔹 Get the currently logged-in supervisor
            var supervisorId = _userManager.GetUserId(User);
            var supervisor = await _userManager.FindByIdAsync(supervisorId);

            if (supervisor == null)
            {
                return Unauthorized("Supervisor not found.");
            }

            // 🔹 Fetch all interns assigned to this supervisor
            var interns = _userManager.Users
                .Where(u => u.SupervisorId == supervisorId)
                .Select(u => new
                {
                    u.Id,
                    u.Email,
                    u.UserName,
                    //i added this
                    u.FirstName,
                    u.LastName
                })
                .ToList();

            return Ok(interns);
        }
    }
}
