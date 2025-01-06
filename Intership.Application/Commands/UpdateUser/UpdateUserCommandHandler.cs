using Intership.Application.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Intership.Application.Commands.UpdateUser
{
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, Unit>
    {
        private readonly IIntershipRepository _repository;

        public UpdateUserCommandHandler(IIntershipRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _repository.GetUserByIdAsync(request.Id);
            if (user == null)
            {
                return Unit.Value;
            }

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Email = request.Email;
            user.Password = request.Password;
            user.RoleId = request.RoleId;

            await _repository.UpdateUserAsync(user);
            return Unit.Value;
        }
    }
}
