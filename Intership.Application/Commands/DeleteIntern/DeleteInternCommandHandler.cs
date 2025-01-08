using MediatR;
using Intership.Application.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Intership.Application.Commands.DeleteIntern
{
    public class DeleteInternCommandHandler : IRequestHandler<DeleteInternCommand, Unit>
    {
        private readonly IInternRepository _repository;

        public DeleteInternCommandHandler(IInternRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(DeleteInternCommand request, CancellationToken cancellationToken)
        {
            var intern = await _repository.GetInternByIdAsync(request.Id);
            if (intern == null)
            {
                return Unit.Value;
            }

            await _repository.DeleteInternAsync(request.Id);
            return Unit.Value;
        }
    }
}
