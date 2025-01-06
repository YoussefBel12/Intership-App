using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Intership.Application.DTOs;
using MediatR;

namespace Intership.Application.Queries.GetUserById
{
    public class GetUserByIdQuery : IRequest<UserDto>
    {
        public int Id { get; set; }
    }
}
