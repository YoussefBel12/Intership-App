using System.Threading;
using System.Threading.Tasks;
using Intership.Application.Interfaces;
using Intership.Domain.Entities;
using MediatR;

namespace Intership.Application.Commands.AddCandidate
{
    public class AddCandidateCommandHandler : IRequestHandler<AddCandidateCommand, int>
    {
        private readonly IIntershipRepository _repository;

        public AddCandidateCommandHandler(IIntershipRepository repository)
        {
            _repository = repository;
        }

        public async Task<int> Handle(AddCandidateCommand request, CancellationToken cancellationToken)
        {
            var candidate = new Candidate
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Password = request.Password,
                School = request.School,
                Level = request.Level,
                CvFilePath = request.CvFilePath,
                RecruitmentSessionId = request.RecruitmentSessionId,
                DateCreated = DateTime.Now
            };
            await _repository.AddCandidateAsync(candidate);
            return candidate.Id;
        }
    }
}
