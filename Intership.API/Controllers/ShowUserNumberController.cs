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
    public class ShowUserNumberController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ShowUserNumberController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("user-count")]
        public async Task<IActionResult> GetUserCount(CancellationToken cancellationToken)
        {
            int userCount = await _mediator.Send(new GetUserUserCountQuery(), cancellationToken);
            return Ok(new { UserCount = userCount });
        }
    }
}
