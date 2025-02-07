using Intership.Infrastructure.Count;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Intership.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
    public class ShowSupervisorNumberController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ShowSupervisorNumberController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("supervisor-count")]
        public async Task<IActionResult> GetSupervisorCount(CancellationToken cancellationToken)
        {
            int supervisorCount = await _mediator.Send(new GetSupervisorUserCountQuery(), cancellationToken);
            return Ok(new { SupervisorCount = supervisorCount });
        }



   

    }
}
