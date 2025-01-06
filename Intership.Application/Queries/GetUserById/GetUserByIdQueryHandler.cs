using System.Threading;
using System.Threading.Tasks;
using Intership.Application.DTOs;
using Intership.Application.Interfaces;
using Intership.Domain.Entities;
using MediatR;

namespace Intership.Application.Queries.GetUserById
{
    public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, UserDto>
    {
        private readonly IIntershipRepository _repository;

        public GetUserByIdQueryHandler(IIntershipRepository repository)
        {
            _repository = repository;
        }

        public async Task<UserDto> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            var user = await _repository.GetUserByIdAsync(request.Id);
            if (user == null)
            {
                return null;
            }

            return new UserDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                RoleName = user.Role?.Name // Ensure Role is not null
            };
        }
    }
}

