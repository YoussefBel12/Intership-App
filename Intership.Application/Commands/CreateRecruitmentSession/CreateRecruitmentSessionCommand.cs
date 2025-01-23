using MediatR;

namespace Intership.Application.Commands.CreateRecruitmentSession
{
    public class CreateRecruitmentSessionCommand : IRequest<int>
    {
        public string Name { get; set; }
        public int Year { get; set; }
        public string Comment { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateEnded { get; set; }
    }
}

