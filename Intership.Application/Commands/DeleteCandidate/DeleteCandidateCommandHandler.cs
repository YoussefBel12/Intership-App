using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Intership.Application.Interfaces;
using MediatR;

namespace Intership.Application.Commands.DeleteCandidate
{
    public class DeleteCandidateCommandHandler : IRequestHandler<DeleteCandidateCommand, Unit>
    {
        private readonly ICandidateRepository _candidateRepository;

        public DeleteCandidateCommandHandler(ICandidateRepository candidateRepository)
        {
            _candidateRepository = candidateRepository;
        }

        public async Task<Unit> Handle(DeleteCandidateCommand request, CancellationToken cancellationToken)
        {
            await _candidateRepository.DeleteCandidateAsync(request.Id);
            return Unit.Value; // Return Unit.Value since no data needs to be returned
        }
    }
}
