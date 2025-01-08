using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Intership.Application.Queries.GetSummary;
using Intership.Application.DTOs; // Make sure this is included to access SummaryDto

namespace Intership.API.Controllers
{
    [Authorize] // Ensures that only authenticated users can access this controller
    public class SecureController : Controller
    {
        private readonly IMediator _mediator;

        public SecureController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // This will be the Index page for the authenticated users
        [HttpGet("secure/index")]
        public async Task<IActionResult> Index()
        {
            // Sending the request to get the summary data
            var summary = await _mediator.Send(new GetSummaryQuery());

            // If no summary data, redirect to login
            if (summary == null)
            {
                return RedirectToAction("Login", "Account"); // Ensure correct login route
            }

            // Return the summary view with data
            return View(summary);
        }
    }
}

