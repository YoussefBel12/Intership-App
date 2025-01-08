using System.Threading.Tasks;
using Intership.Application.DTOs;

using Intership.Application.Interfaces;
using Intership.Application.Queries.GetSummary;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Intership.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SummaryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SummaryController(IMediator mediator)
        {
            _mediator = mediator;
        }
        // // //
        [Authorize]
        // // //
        [HttpGet("summary")]
        public async Task<ActionResult<SummaryDto>> GetSummary()
        {
            var summary = await _mediator.Send(new GetSummaryQuery());
            return Ok(summary);
        }
        

    }
}
