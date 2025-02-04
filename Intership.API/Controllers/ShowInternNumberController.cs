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
    public class ShowInternNumberController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ShowInternNumberController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("intern-count")]
        public async Task<IActionResult> GetInternCount(CancellationToken cancellationToken)
        {
            int internCount = await _mediator.Send(new GetInternUserCountQuery(), cancellationToken);
            return Ok(new { InternCount = internCount });
        }
    }
}
