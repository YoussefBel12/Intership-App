using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Intership.Application.DTOs;
using MediatR;

namespace Intership.Application.Queries.GetAllRecruitmentSessions
{
    public class GetActiveRecruitmentSessionQuery : IRequest<RecruitmentSessionDto>
    {
    }
}
