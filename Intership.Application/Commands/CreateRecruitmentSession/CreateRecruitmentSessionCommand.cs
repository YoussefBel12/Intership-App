using MediatR;

namespace Intership.Application.Commands.CreateRecruitmentSession
{
    public class CreateRecruitmentSessionCommand : IRequest<int>
    {
        public string Name { get; set; }
        public int Year { get; set; }
        public string Comment { get; set; }
        public int SupervisorId { get; set; }
    }
}

