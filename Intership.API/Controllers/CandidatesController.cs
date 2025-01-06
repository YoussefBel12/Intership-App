using System.Collections.Generic;
using System.Threading.Tasks;
using Intership.Application.Commands.AddCandidate;
using Intership.Application.DTOs;
using Intership.Application.Queries.GetAllCandidates;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Intership.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CandidatesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<int>> AddCandidate(AddCandidateCommand command)
        {
            var candidateId = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetAllCandidates), new { id = candidateId }, candidateId);
        }

        [HttpGet]
        public async Task<ActionResult<List<CandidateDto>>> GetAllCandidates()
        {
            var candidates = await _mediator.Send(new GetAllCandidatesQuery());
            return Ok(candidates);
        }
    }
}
