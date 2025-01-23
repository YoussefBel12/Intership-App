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
        private readonly IRecruitmentSessionRepository _repository;

        public GetAllRecruitmentSessionsQueryHandler(IRecruitmentSessionRepository repository)
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
                DateEnded = session.DateEnded,
            }).ToList();
        }
    }
}



/*
                SupervisorId = session.SupervisorId,
                // SupervisorName = session.SuperVisor.FirstName + " " + session.SuperVisor.LastName
                SupervisorName = session.SuperVisor != null
            ? session.SuperVisor.FirstName + " " + session.SuperVisor.LastName
            : "No Supervisor"  // You can return a default value if the supervisor is null
*/
