using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Intership.Application.DTOs;
using Intership.Application.Interfaces;
using MediatR;

namespace Intership.Application.Queries.GetAllRecruitmentSessions
{
    public class GetAllRecruitmentSessionsQueryHandler : IRequestHandler<GetAllRecruitmentSessionsQuery, List<RecruitmentSessionDto>>
    {
        private readonly IIntershipRepository _repository;

        public GetAllRecruitmentSessionsQueryHandler(IIntershipRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<RecruitmentSessionDto>> Handle(GetAllRecruitmentSessionsQuery request, CancellationToken cancellationToken)
        {
            var sessions = await _repository.GetAllRecruitmentSessionsAsync();
            return sessions.Select(session => new RecruitmentSessionDto
            {
                Id = session.Id,
                Name = session.Name,
                Year = session.Year,
                Comment = session.Comment,
                DateCreated = session.DateCreated,
                SupervisorId = session.SupervisorId,
                SupervisorName = session.SuperVisor.FirstName + " " + session.SuperVisor.LastName
            }).ToList();
        }
    }
}
