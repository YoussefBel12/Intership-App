using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace Intership.Infrastructure.Identity
{
    public class AssignSupervisorCommand : IRequest<Unit>
    {
        public string InternId { get; set; }
        public string SupervisorId { get; set; }
    }
}
