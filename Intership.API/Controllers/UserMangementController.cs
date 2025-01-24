using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using System.Threading.Tasks;
using Intership.Application.DTOs;
using Intership.Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Intership.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
    public class UserManagementController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public UserManagementController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        // Add a new user
        
        [HttpPost("add")]
        public async Task<IActionResult> AddUser([FromBody] UserDto model)
        {
            if (!string.IsNullOrEmpty(model.Role) && !await _roleManager.RoleExistsAsync(model.Role))
            {
                return BadRequest(new { message = $"Role '{model.Role}' does not exist." });
            }

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors.Select(e => e.Description));
            }

            if (!string.IsNullOrEmpty(model.Role))
            {
                var roleResult = await _userManager.AddToRoleAsync(user, model.Role);
                if (!roleResult.Succeeded)
                {
                    return BadRequest(roleResult.Errors.Select(e => e.Description));
                }
            }

            return Ok(new { message = "User added successfully." });
        }

        // Modify an existing user
        
        [HttpPut("modify/{userId}")]
       
        public async Task<IActionResult> ModifyUser(string userId, [FromBody] UserDto model)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            // Update user details
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Email = model.Email;

            var updateResult = await _userManager.UpdateAsync(user);
            if (!updateResult.Succeeded)
            {
                return BadRequest(updateResult.Errors.Select(e => e.Description));
            }

            // Update user roles if provided
            if (!string.IsNullOrEmpty(model.Role))
            {
                var currentRoles = await _userManager.GetRolesAsync(user);

                foreach (var role in currentRoles)
                {
                    await _userManager.RemoveFromRoleAsync(user, role);
                }

                var addRoleResult = await _userManager.AddToRoleAsync(user, model.Role);
                if (!addRoleResult.Succeeded)
                {
                    return BadRequest(addRoleResult.Errors.Select(e => e.Description));
                }
            }

            return Ok(new { message = "User modified successfully." });
        }

        // Get details of a user
      
        [HttpGet("view/{userId}")]
      
        public async Task<IActionResult> ViewUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            var userDto = new
            {
                user.FirstName,
                user.LastName,
                user.Email,
                Roles = await _userManager.GetRolesAsync(user)
            };

            return Ok(userDto);
        }

        // List all users
        [HttpGet("list")]
        
        public async Task<IActionResult> ListUsers()
        {
            var users = await _userManager.Users
                .AsNoTracking() // Avoid change tracking for read-only operations
                .ToListAsync();

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


        [HttpGet("role")]
        [Authorize] // Ensure the user is authenticated
        public async Task<IActionResult> GetUserRole()
        {
            // Get the user ID from the token
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized(new { message = "User not found" });
            }

            // Fetch the user from the database
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return Unauthorized(new { message = "User not found" });
            }

            // Get roles for the user
            var roles = await _userManager.GetRolesAsync(user);

            if (roles == null || roles.Count == 0)
            {
                return Ok(new { role = "none" });
            }

            // Return the first role (if you have multiple roles, adjust this logic)
            return Ok(new { role = roles[0] });
        }
    }




}
