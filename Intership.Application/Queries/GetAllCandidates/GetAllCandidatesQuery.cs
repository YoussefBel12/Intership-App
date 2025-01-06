using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Collections.Generic;
using Intership.Application.DTOs;
using MediatR;

namespace Intership.Application.Queries.GetAllCandidates
{
    public class GetAllCandidatesQuery : IRequest<List<CandidateDto>>
    {
    }
}

