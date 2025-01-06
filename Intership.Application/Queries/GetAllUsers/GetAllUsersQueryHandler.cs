using Intership.Application.DTOs;
using Intership.Application.Interfaces;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Intership.Application.Queries.GetAllUsers
{
    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, List<UserDto>>
    {
        private readonly IIntershipRepository _repository;

        public GetAllUsersQueryHandler(IIntershipRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<UserDto>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            var users = await _repository.GetAllUsersAsync();
            var userDtos = new List<UserDto>();

            foreach (var user in users)
            {
                userDtos.Add(new UserDto
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Password = user.Password,
                    RoleId = user.RoleId,
                    RoleName = user.Role?.Name // Ensure Role is not null
                });
            }

            return userDtos;
        }
    }
}
