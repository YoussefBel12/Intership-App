using MediatR;
using Intership.Application.Interfaces;
using System.Threading;
using System.Threading.Tasks;
using Intership.Application.DTOs;

namespace Intership.Application.Queries.GetInternById
{
    public class GetInternByIdQueryHandler : IRequestHandler<GetInternByIdQuery, InternDto>
    {
        private readonly IInternRepository _repository;

        public GetInternByIdQueryHandler(IInternRepository repository)
        {
            _repository = repository;
        }

        public async Task<InternDto> Handle(GetInternByIdQuery request, CancellationToken cancellationToken)
        {
            var intern = await _repository.GetInternByIdAsync(request.Id);
            if (intern == null)
            {
                return null;
            }

            return new InternDto
            {
                Id = intern.Id,
                FirstName = intern.FirstName,
                LastName = intern.LastName,
                Email = intern.Email,
                School = intern.School,
                Level = intern.Level,
                SupervisorId = intern.SupervisorId
            };
        }
    }
}
