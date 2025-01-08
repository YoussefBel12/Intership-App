using Microsoft.AspNetCore.Mvc;

namespace Intership.API.Controllers
{
    public class LandingController : Controller
    {
        [HttpGet("/")]
        public IActionResult Index()
        {
            return View("Landing");  // Render the landing.cshtml view
        }
    }
}

