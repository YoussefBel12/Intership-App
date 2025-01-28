using MediatR;

namespace Intership.Application.Commands.UpdateIntern
{
    public class UpdateInternCommand : IRequest<Unit>
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
   
        public string School { get; set; }
        public string Level { get; set; }
        public int? SupervisorId { get; set; }
    }
}

