using Intership.Application.DTOs;
using MediatR;
using System.Collections.Generic;

namespace Intership.Application.Queries.GetAllUsers
{
    public class GetAllUsersQuery : IRequest<List<UserDto>>
    {
    }
}
