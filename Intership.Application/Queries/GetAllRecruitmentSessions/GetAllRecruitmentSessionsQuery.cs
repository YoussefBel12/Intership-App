using System.Collections.Generic;
using Intership.Application.DTOs;
using MediatR;

namespace Intership.Application.Queries.GetAllRecruitmentSessions
{
    public class GetAllRecruitmentSessionsQuery : IRequest<List<RecruitmentSessionDto>>
    {
    }
}
