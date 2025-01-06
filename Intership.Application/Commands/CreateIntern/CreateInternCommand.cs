using MediatR;

namespace Intership.Application.Commands.CreateIntern
{
    public class CreateInternCommand : IRequest<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string School { get; set; }
        public string Level { get; set; }
        public int? SupervisorId { get; set; }
    }
}
