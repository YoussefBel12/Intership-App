using System.Threading;
using System.Threading.Tasks;
using Intership.Application.Interfaces;
using Intership.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http; // Add this using statement

namespace Intership.Application.Commands.AddCandidate
{
    public class AddCandidateCommandHandler : IRequestHandler<AddCandidateCommand, int>
    {
        private readonly ICandidateRepository  _repository;
       
        //this one is added
        private readonly IFileStorageService _fileStorageService; // File storage service

        public AddCandidateCommandHandler(ICandidateRepository repository , IFileStorageService fileStorageService )
        {
        
            _repository = repository;
            //same here
            _fileStorageService = fileStorageService;
        }

        public async Task<int> Handle(AddCandidateCommand request, CancellationToken cancellationToken)
        {
            //this things below added everything till var candidate new candidate
            string cvFilePath = null;
            if (request.CvFile != null)
            {
                if (!IsPdfFile(request.CvFile)) // Validate file type (optional)
                {
                    throw new Exception("Invalid file format. Only PDF files allowed.");
                }

                cvFilePath = await _fileStorageService.StoreFileAsync(request.CvFile, "cvs"); // Store the PDF
            }



            var candidate = new Candidate
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
        //        Password = request.Password,
                School = request.School,
                Level = request.Level,
                CvFilePath = request.CvFilePath,
                RecruitmentSessionId = request.RecruitmentSessionId,
           
                DateCreated = DateTime.Now
            };
            await _repository.AddCandidateAsync(candidate);
            return candidate.Id;
        }


        //i added this
        private bool IsPdfFile(IFormFile file)
        {
            // Check if the file content type is "application/pdf"
            return file.ContentType.Contains("application/pdf");
        }



    }
}
