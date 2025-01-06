using System.Threading.Tasks;
using Intership.Application.DTOs;
using Intership.Application.DTOs.Intership.Application.DTOs;
using Intership.Application.Interfaces;
using Intership.Application.Queries.GetSummary;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Intership.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IMediator _mediator;

        public HomeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("summary")]
        public async Task<ActionResult<SummaryDto>> GetSummary()
        {
            var summary = await _mediator.Send(new GetSummaryQuery());
            return Ok(summary);
        }
    }
}
