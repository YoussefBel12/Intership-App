using Intership.Infrastructure.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Intership.Infrastructure.Count
{
    public class GetUserUserCountQueryHandler : IRequestHandler<GetUserUserCountQuery, int>
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public GetUserUserCountQueryHandler(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<int> Handle(GetUserUserCountQuery request, CancellationToken cancellationToken)
        {
            // This method retrieves all users in the specified role.
            // Note: Depending on the number of users, this might load more data than needed.
            // For large datasets, consider a more efficient query directly on your IdentityDbContext.
            var userUsers = await _userManager.GetUsersInRoleAsync("user");
            return userUsers.Count;
        }
    }
}

