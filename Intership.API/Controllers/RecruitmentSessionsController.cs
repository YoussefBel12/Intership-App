using System.Collections.Generic;
using System.Threading.Tasks;
using Intership.Application.Commands.CreateRecruitmentSession;
using Intership.Application.DTOs;
using Intership.Application.Queries.GetAllRecruitmentSessions;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Intership.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecruitmentSessionsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RecruitmentSessionsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost]
        public async Task<ActionResult<int>> CreateRecruitmentSession(CreateRecruitmentSessionCommand command)
        {
            var sessionId = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetAllRecruitmentSessions), new { id = sessionId }, sessionId);
        }

        
        [HttpGet]
        public async Task<ActionResult<List<RecruitmentSessionDto>>> GetAllRecruitmentSessions()
        {
            var sessions = await _mediator.Send(new GetAllRecruitmentSessionsQuery());
            return Ok(sessions);
        }
    }
}
