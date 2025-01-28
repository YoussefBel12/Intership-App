using MediatR;
using Intership.Application.Interfaces;
using Intership.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Intership.Application.Commands.CreateIntern
{
    public class CreateInternCommandHandler : IRequestHandler<CreateInternCommand, int>
    {
        private readonly IInternRepository _repository;
        private readonly ISuperVisorRepository _superVisorRepository;

        public CreateInternCommandHandler(IInternRepository repository, ISuperVisorRepository superVisorRepository )
        {
            _repository = repository;
            _superVisorRepository = superVisorRepository;
        }

        public async Task<int> Handle(CreateInternCommand request, CancellationToken cancellationToken)
        {
            // Check if the supervisorId is provided and if the supervisor exists
            if (request.SupervisorId.HasValue)
            {
                var supervisor = await _superVisorRepository.GetSuperVisorByIdAsync(request.SupervisorId.Value);
                if (supervisor == null)
                {
                    // Return -1 or throw an exception indicating the supervisor is not found
                    return -1; // You could also throw an exception like new NotFoundException("Supervisor not found.");
                }
            }

            // Create the intern object
            var intern = new Intern
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                
                School = request.School,
                Level = request.Level,
                SupervisorId = request.SupervisorId // Attach the SupervisorId to the intern
            };

            // Add the intern to the repository
            await _repository.AddInternAsync(intern);

            // Return the intern Id after successfully adding it
            return intern.Id;
        }
    }
}
