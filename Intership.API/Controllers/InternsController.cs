using System.Collections.Generic;
using System.Threading.Tasks;
using Intership.Application.Commands.CreateIntern;
using Intership.Application.Commands.DeleteIntern;
using Intership.Application.Commands.UpdateIntern;
using Intership.Application.DTOs;
using Intership.Application.Queries.GetAllInterns;
using Intership.Application.Queries.GetInternById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Intership.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InternsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public InternsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // Intern CRUD operations

        [HttpGet()]
        public async Task<ActionResult<List<InternDto>>> GetAllInterns()
        {
            var interns = await _mediator.Send(new GetAllInternsQuery());
            return Ok(interns);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InternDto>> GetInternById(int id)
        {
            var intern = await _mediator.Send(new GetInternByIdQuery { Id = id });
            if (intern == null)
            {
                return NotFound();
            }
            return Ok(intern);
        }

        [HttpPost()]
        public async Task<ActionResult<int>> CreateIntern(CreateInternCommand command)
        {
            var internId = await _mediator.Send(command);
            if (internId == -1)
            {
                return BadRequest("Supervisor not found");
            }
            return CreatedAtAction(nameof(GetInternById), new { id = internId }, internId);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIntern(int id, UpdateInternCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }

            await _mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIntern(int id)
        {
            await _mediator.Send(new DeleteInternCommand { Id = id });
            return NoContent();
        }

        // Add similar CRUD operations for SuperVisor, RecruitmentSession, Candidate, and User
        // For brevity, only Intern operations are shown here
    }
}
