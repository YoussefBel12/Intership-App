using Intership.Application.DTOs;
using Intership.Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Intership.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
    public class UserManagementController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserManagementController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        // Add a new user
        [HttpPost("add")]
        public async Task<IActionResult> AddUser([FromBody] AddUserDto model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                if (!string.IsNullOrEmpty(model.Role))
                {
                    await _userManager.AddToRoleAsync(user, model.Role);
                }
                return Ok(new { message = "User added successfully" });
            }

            return BadRequest(result.Errors);
        }

        // Modify an existing user
        [HttpPut("modify/{userId}")]
        public async Task<IActionResult> ModifyUser(string userId, [FromBody] ModifyUserDto model)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound(new { message = "User not found" });
            
            // Update basic user information
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Email = model.Email;

            // Update user role if provided
            if (!string.IsNullOrEmpty(model.Role))
            {
                var currentRoles = await _userManager.GetRolesAsync(user);

                // Remove existing roles
                foreach (var role in currentRoles)
                {
                    await _userManager.RemoveFromRoleAsync(user, role);
                }

                // Add new role if provided
                await _userManager.AddToRoleAsync(user, model.Role);
            }

            // Update user in the database
            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok(new { message = "User modified successfully" });
            }

            return BadRequest(result.Errors);
        }


        // View a user's details
        [HttpGet("view/{userId}")]
        public async Task<IActionResult> ViewUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound(new { message = "User not found" });

            var userDto = new
            {
                user.FirstName,
                user.LastName,
                user.Email,
                user.UserName
            };

            return Ok(userDto);
        }

        // List all users
        [HttpGet("list")]
        public async Task<IActionResult> ListUsers()
        {
            var users = _userManager.Users.Select(u => new
            {
                u.Id,
                u.UserName,
                u.Email,
                u.FirstName,
                u.LastName
            }).ToList();

            return Ok(users);
        }
    }
}
