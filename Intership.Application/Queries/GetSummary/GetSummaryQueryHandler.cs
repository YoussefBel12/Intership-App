using MediatR;
using Intership.Application.DTOs;
using Intership.Application.Interfaces;
using System.Threading;
using System.Threading.Tasks;


namespace Intership.Application.Queries.GetSummary
{
    public class GetSummaryQueryHandler : IRequestHandler<GetSummaryQuery, SummaryDto>
    {
        private readonly IIntershipRepository _repository;

        public GetSummaryQueryHandler(IIntershipRepository repository)
        {
            _repository = repository;
        }

        public async Task<SummaryDto> Handle(GetSummaryQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetSummaryForCurrentYearAsync();
        }
    }
}

