using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Intership.Application.Commands;
using Intership.Infrastructure.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Intership.Infrastructure.Identity
{
    public class AssignSupervisorCommandHandler : IRequestHandler<AssignSupervisorCommand , Unit>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public AssignSupervisorCommandHandler(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<Unit> Handle(AssignSupervisorCommand request, CancellationToken cancellationToken)
        {
            // Retrieve the intern's ApplicationUser record.
            var internUser = await _userManager.FindByIdAsync(request.InternId);
            if (internUser == null)
            {
                throw new System.Exception("Intern user not found.");
            }

            // Retrieve and validate the supervisor.
            var supervisorUser = await _userManager.FindByIdAsync(request.SupervisorId);
            if (supervisorUser == null)
            {
                throw new System.Exception("Supervisor not found.");
            }
            var supervisorRoles = await _userManager.GetRolesAsync(supervisorUser);
            if (!supervisorRoles.Contains("supervisor"))
            {
                throw new System.Exception("The selected user is not a supervisor.");
            }

            // Assign the supervisor to the intern.
            internUser.SupervisorId = request.SupervisorId;
            var updateResult = await _userManager.UpdateAsync(internUser);
            if (!updateResult.Succeeded)
            {
                throw new System.Exception("Failed to update intern record.");
            }

            return Unit.Value;
        }
    }
}
