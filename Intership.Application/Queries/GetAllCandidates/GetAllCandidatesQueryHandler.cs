using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Intership.Application.DTOs;
using Intership.Application.Interfaces;
using MediatR;

namespace Intership.Application.Queries.GetAllCandidates
{
    public class GetAllCandidatesQueryHandler : IRequestHandler<GetAllCandidatesQuery, List<CandidateDto>>
    {
        private readonly IIntershipRepository _repository;

        public GetAllCandidatesQueryHandler(IIntershipRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<CandidateDto>> Handle(GetAllCandidatesQuery request, CancellationToken cancellationToken)
        {
            var candidates = await _repository.GetAllCandidatesAsync();
            return candidates.Select(candidate => new CandidateDto
            {
                Id = candidate.Id,
                FirstName = candidate.FirstName,
                LastName = candidate.LastName,
                Email = candidate.Email,
                School = candidate.School,
                Level = candidate.Level,
                CvFilePath = candidate.CvFilePath,
                RecruitmentSessionId = candidate.RecruitmentSessionId,
                RecruitmentSessionName = candidate.RecruitmentSession.Name,
                DateCreated = candidate.DateCreated
            }).ToList();
        }
    }
}
