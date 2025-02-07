using Intership.Infrastructure.Count;
using Intership.Infrastructure.Identity;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace Intership.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
    public class InternsPerSupervisorController : ControllerBase
    {
        private readonly IMediator _mediator;

        public InternsPerSupervisorController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("intern-count")]
        public async Task<IActionResult> GetSupervisorsWithInterns()
        {
            var result = await _mediator.Send(new GetInternsPerSupervisorQuery());
            return Ok(result);
        }
    }
}