using MediatR;
using Intership.Application.DTOs;
using System.Collections.Generic;

namespace Intership.Application.Queries.GetAllInterns
{
    public class GetAllInternsQuery : IRequest<List<InternDto>>
    {
    }
}
