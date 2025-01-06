using MediatR;
using Intership.Application.Interfaces;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Intership.Application.DTOs;

namespace Intership.Application.Queries.GetAllInterns
{
    public class GetAllInternsQueryHandler : IRequestHandler<GetAllInternsQuery, List<InternDto>>
    {
        private readonly IIntershipRepository _repository;

        public GetAllInternsQueryHandler(IIntershipRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<InternDto>> Handle(GetAllInternsQuery request, CancellationToken cancellationToken)
        {
            var interns = await _repository.GetAllInternsAsync();
            var internDtos = new List<InternDto>();

            foreach (var intern in interns)
            {
                internDtos.Add(new InternDto
                {
                    Id = intern.Id,
                    FirstName = intern.FirstName,
                    LastName = intern.LastName,
                    Email = intern.Email,
                    School = intern.School,
                    Level = intern.Level,
                    SupervisorId = intern.SupervisorId
                });
            }

            return internDtos;
        }
    }
}
