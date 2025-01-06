using MediatR;
using Intership.Application.Interfaces;
using Intership.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Intership.Application.Commands.CreateIntern
{
    public class CreateInternCommandHandler : IRequestHandler<CreateInternCommand, int>
    {
        private readonly IIntershipRepository _repository;

        public CreateInternCommandHandler(IIntershipRepository repository)
        {
            _repository = repository;
        }

        public async Task<int> Handle(CreateInternCommand request, CancellationToken cancellationToken)
        {
            if (request.SupervisorId.HasValue)
            {
                var supervisor = await _repository.GetSuperVisorByIdAsync(request.SupervisorId.Value);
                if (supervisor == null)
                {
                    // Return a special value to indicate that the supervisor was not found
                    return -1;
                }
            }

            var intern = new Intern
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Password = request.Password,
                School = request.School,
                Level = request.Level,
                SupervisorId = request.SupervisorId
            };

            await _repository.AddInternAsync(intern);
            return intern.Id;
        }
    }
}
