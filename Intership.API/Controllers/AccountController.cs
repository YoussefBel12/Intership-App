using Intership.Application.DTOs;
using Microsoft.AspNetCore.Identity;
using Intership.Infrastructure.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Intership.API.Controllers
{
    [Route("/account")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // GET: /account/login
        [HttpGet("login")]
        public IActionResult Login()
        {
            return View("Login"); // Render the Login view from Views/Account
        }

        // POST: /account/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user != null)
                {
                    var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);
                    if (result.Succeeded)
                    {
                        // Redirect to Secure/Index or another secure page
                        return RedirectToAction("Index", "Secure");
                    }
                }
                ModelState.AddModelError("", "Invalid login attempt.");
            }

            // Return to the Login view with the model if login fails
            return View("Login", model);
        }

        // GET: /account/register
        [HttpGet("register")]
        public IActionResult Register()
        {
            return View("Register"); // Render the Register view from Views/Account
        }

        // POST: /account/register
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto model)
        {
            if (ModelState.IsValid)
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
                    // After registration, redirect to Secure/Index or another page
                    return RedirectToAction("Index", "Secure");
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
            }

            // Return to the Register view with the model if registration fails
            return View("Register", model);
        }

        // POST: /account/logout
        [HttpGet("logout")]
public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index", "Landing"); // Redirect to the Landing/Index page after logout
        }
    }
}
