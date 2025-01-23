using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Intership.Application.Commands.AddCandidate;
using Intership.Application.Commands.DeleteCandidate;
using Intership.Application.DTOs;
using Intership.Application.Queries.GetAllCandidates;
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

        /*    [HttpPost]
            public async Task<ActionResult<int>> AddCandidate(AddCandidateCommand command)
            {
                var candidateId = await _mediator.Send(command);
                return CreatedAtAction(nameof(GetAllCandidates), new { id = candidateId }, candidateId);
            }
        */


        /* this http post is the real deal
         [HttpPost]
         public async Task<ActionResult<int>> AddCandidate([FromForm] AddCandidateCommand command) // Use [FromForm]
         {
             if (command.CvFile != null && command.CvFile.Length > 0)
             {
                 // Handle file upload (save to disk or cloud storage)
                 string fileName = Path.GetFileName(command.CvFile.FileName);
                 string filePath = Path.Combine(Directory.GetCurrentDirectory(), "uploads", fileName); // Example path
                 using (var stream = new FileStream(filePath, FileMode.Create))
                 {
                     await command.CvFile.CopyToAsync(stream);
                 }
                command.CvFilePath = filePath; // Set the file path in the command
             }

             if (!ModelState.IsValid)
             {
                 return BadRequest(ModelState);
             }
             var candidateId = await _mediator.Send(command);
             return CreatedAtAction(nameof(GetAllCandidates), new { id = candidateId }, candidateId);
         }
       */
        [HttpPost]
        public async Task<ActionResult<int>> AddCandidate([FromForm] AddCandidateCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string filePath = null; // Initialize to null

            if (command.CvFile != null && command.CvFile.Length > 0)
            {
                try
                {
                    // 1. Generate a unique and safe filename
                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(command.CvFile.FileName);

                    // 2. Determine the correct upload path (important!)
                    string uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads", "candidate_cvs"); // Use WebRootPath

                    // Create the directory if it doesn't exist
                    Directory.CreateDirectory(uploadsFolder);

                    filePath = Path.Combine(uploadsFolder, fileName);

                    // 3. Save the file
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await command.CvFile.CopyToAsync(stream);
                    }
                }
                catch (Exception ex)
                {
                    // Log the exception! Very important for debugging
                    Console.WriteLine($"Error saving file: {ex}");
                    return StatusCode(500, "Error saving the CV file."); // Return a 500 error
                }
            }

            // 4. Create the command for MediatR (or your data access logic)
            var addCandidateCommand = new AddCandidateCommand
            {
                FirstName = command.FirstName,
                LastName = command.LastName,
                Email = command.Email,
                School = command.School,
                Level = command.Level,
                RecruitmentSessionId = command.RecruitmentSessionId,
                RecruitmentSessionName=command.RecruitmentSessionName,
                CvFilePath = filePath // Pass the filePath (or null)
            };

            try
            {
                var candidateId = await _mediator.Send(addCandidateCommand);
                return CreatedAtAction(nameof(GetAllCandidates), new { id = candidateId }, candidateId);
            }
            catch (Exception ex)
            {
                // Log the exception!
                Console.WriteLine($"Error creating candidate: {ex}");
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
