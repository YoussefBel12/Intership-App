using Intership.Application.Interfaces;
using Intership.Application.DTOs;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Intership.Application.Queries.GetAllCandidates
{
    public class GetAllCandidatesQueryHandler : IRequestHandler<GetAllCandidatesQuery, List<CandidateDto>>
    {
        private readonly ICandidateRepository _repository;

        public GetAllCandidatesQueryHandler(ICandidateRepository repository)
        {
            _repository = repository;
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
                    CvFilePath = candidate.CvFilePath,
                    RecruitmentSessionId = candidate.RecruitmentSessionId,
                    RecruitmentSessionName = candidate.RecruitmentSession?.Name ?? "No Session", // Handle null
                    DateCreated = candidate.DateCreated
                });
            }

            return candidateDtos;
        }
    }
}
