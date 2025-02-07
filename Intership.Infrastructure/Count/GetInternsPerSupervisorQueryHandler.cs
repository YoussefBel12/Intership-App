using System.Linq;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MediatR;

using Intership.Domain.Entities;
using Intership.Infrastructure.Identity;

namespace Intership.Infrastructure.Count
{
    public class GetInternsPerSupervisorQueryHandler : IRequestHandler<GetInternsPerSupervisorQuery, List<InternsPerSupervisorDto>>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public GetInternsPerSupervisorQueryHandler(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<List<InternsPerSupervisorDto>> Handle(GetInternsPerSupervisorQuery request, CancellationToken cancellationToken)
        {
            var users = await _userManager.Users.ToListAsync(cancellationToken);
            var supervisors = new List<InternsPerSupervisorDto>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                if (roles.Contains("supervisor"))
                {
                    int internCount = users.Count(i => i.SupervisorId == user.Id);

                    supervisors.Add(new InternsPerSupervisorDto
                    {
                        FullName = user.FirstName + user.LastName,
                        InternCount = internCount
                    });
                }
            }

            return supervisors;
        }
    }
}



