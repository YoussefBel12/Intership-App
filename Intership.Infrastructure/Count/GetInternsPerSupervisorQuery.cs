using MediatR;
using System.Collections.Generic;

namespace Intership.Infrastructure.Count
{
    public class GetInternsPerSupervisorQuery : IRequest<List<InternsPerSupervisorDto>>
    {
    }

    public class InternsPerSupervisorDto
    {

        public string FullName { get; set; } = string.Empty;
        public int InternCount { get; set; }
    }
}


