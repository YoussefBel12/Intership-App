using Intership.Application.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Intership.Application.Commands.DeleteUser
{
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, Unit>
    {
        private readonly IUserRepository _repository;

        public DeleteUserCommandHandler(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            await _repository.DeleteUserAsync(request.Id);
            return Unit.Value;
        }
    }
}

