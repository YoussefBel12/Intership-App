using Intership.Application.Interfaces;
using Intership.Application.DTOs;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Intership.Application.Queries.GetAllCandidates
{
    public class GetAllCandidatesQueryHandler : IRequestHandler<GetAllCandidatesQuery, List<CandidateDto>>
    {
        private readonly ICandidateRepository _repository;
        private readonly IConfiguration _configuration;
        public GetAllCandidatesQueryHandler(ICandidateRepository repository ,IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
        }

        public async Task<List<CandidateDto>> Handle(GetAllCandidatesQuery request, CancellationToken cancellationToken)
        {
            var candidates = await _repository.GetAllCandidatesAsync();
            var candidateDtos = new List<CandidateDto>();

            foreach (var candidate in candidates)
            {
                candidateDtos.Add(new CandidateDto
                {
                    Id = candidate.Id,
                    FirstName = candidate.FirstName,
                    LastName = candidate.LastName,
                    Email = candidate.Email,
                    School = candidate.School,
                    Level = candidate.Level,
                    //      CvFilePath = candidate.CvFilePath,
                    //this line bellow just convert directory to URL to access in http u can use the one up
                    CvFilePath = string.IsNullOrEmpty(candidate.CvFilePath)
            ? null
            : $"{_configuration["AppBaseUrl"]}/uploads/candidate_cvs/{Path.GetFileName(candidate.CvFilePath)}",

                    RecruitmentSessionId = candidate.RecruitmentSessionId,
           
                    DateCreated = candidate.DateCreated
                });
            }

            return candidateDtos;
        }
    }
}
