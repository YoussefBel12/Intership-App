using MediatR;
using Intership.Application.Interfaces;
using Intership.Application.DTOs;
using System.Threading;
using System.Threading.Tasks;
using Intership.Application.Queries.GetAllRecruitmentSessions;

public class GetActiveRecruitmentSessionQueryHandler : IRequestHandler<GetActiveRecruitmentSessionQuery, RecruitmentSessionDto>
{
    private readonly IRecruitmentSessionRepository _repository;

    public GetActiveRecruitmentSessionQueryHandler(IRecruitmentSessionRepository repository)
    {
        _repository = repository;
    }

    public async Task<RecruitmentSessionDto> Handle(GetActiveRecruitmentSessionQuery request, CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow; // Get the current UTC time
        var activeSession = await _repository.GetActiveRecruitmentSessionAsync(now);

        if (activeSession == null)
        {
            return null; // Or throw an exception if preferred
        }

        return new RecruitmentSessionDto
        {
            Id = activeSession.Id,
            Year = activeSession.Year,
            Name = activeSession.Name,
            Comment = activeSession.Comment,
            DateCreated = activeSession.DateCreated,
            DateEnded = activeSession.DateEnded
        };
    }
}
