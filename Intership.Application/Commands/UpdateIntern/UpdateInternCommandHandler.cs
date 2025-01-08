using MediatR;
using Intership.Application.Interfaces;
using System.Threading;
using System.Threading.Tasks;
using Intership.Domain.Entities;

namespace Intership.Application.Commands.UpdateIntern
{
    public class UpdateInternCommandHandler : IRequestHandler<UpdateInternCommand, Unit>
    {
        private readonly IInternRepository _repository;

        public UpdateInternCommandHandler(IInternRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(UpdateInternCommand request, CancellationToken cancellationToken)
        {
            var intern = await _repository.GetInternByIdAsync(request.Id);
            if (intern == null)
            {
                return Unit.Value;
            }

            intern.FirstName = request.FirstName;
            intern.LastName = request.LastName;
            intern.Email = request.Email;
            intern.Password = request.Password;
            intern.School = request.School;
            intern.Level = request.Level;
            intern.SupervisorId = request.SupervisorId;

            await _repository.UpdateInternAsync(intern);
            return Unit.Value;
        }
    }
}
