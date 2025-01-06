using MediatR;

namespace Intership.Application.Commands.DeleteIntern
{
    public class DeleteInternCommand : IRequest<Unit>
    {
        public int Id { get; set; }
    }
}
