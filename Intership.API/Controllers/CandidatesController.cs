using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Intership.Application.Commands.AddCandidate;
using Intership.Application.Commands.DeleteCandidate;
using Intership.Application.DTOs;
using Intership.Application.Queries.GetAllCandidates;
using Intership.Application.Queries.GetAllRecruitmentSessions;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Intership.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatesController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IWebHostEnvironment _environment;
        public CandidatesController(IMediator mediator, IWebHostEnvironment environment)
        {
            _mediator = mediator;
            _environment = environment;
        }

      
        [HttpPost]
        public async Task<ActionResult<int>> AddCandidate([FromForm] AddCandidateCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Get the active recruitment session
            var activeSession = await _mediator.Send(new GetActiveRecruitmentSessionQuery());

            if (activeSession == null)
            {
                return BadRequest("No active recruitment session found.");
            }

            string filePath = null;

            if (command.CvFile != null && command.CvFile.Length > 0)
            {
                try
                {
                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(command.CvFile.FileName);
                    string uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads", "candidate_cvs");
                    Directory.CreateDirectory(uploadsFolder);
                    filePath = Path.Combine(uploadsFolder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await command.CvFile.CopyToAsync(stream);
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(500, "Error saving the CV file.");
                }
            }

            var addCandidateCommand = new AddCandidateCommand
            {
                FirstName = command.FirstName,
                LastName = command.LastName,
                Email = command.Email,
                School = command.School,
                Level = command.Level,
                RecruitmentSessionId = activeSession.Id, // Use the active session ID

                CvFilePath = filePath
            };

            try
            {
                var candidateId = await _mediator.Send(addCandidateCommand);
                return CreatedAtAction(nameof(GetAllCandidates), new { id = candidateId }, candidateId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error creating the candidate.");
            }
        }







        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet]
        public async Task<ActionResult<List<CandidateDto>>> GetAllCandidates()
        {
            var candidates = await _mediator.Send(new GetAllCandidatesQuery());
            return Ok(candidates);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCandidate(int id)
        {
            await _mediator.Send(new DeleteCandidateCommand(id));
            return NoContent(); // Returns 204 status code
        }

    }
}
