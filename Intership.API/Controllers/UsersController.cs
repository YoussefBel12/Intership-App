using System.Collections.Generic;
using System.Threading.Tasks;
using Intership.Application.Commands.CreateUser;
using Intership.Application.Commands.DeleteUser;
using Intership.Application.Commands.UpdateUser;
using Intership.Application.DTOs;
using Intership.Application.Queries.GetAllUsers;
using Intership.Application.Queries.GetUserById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Intership.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateUser(CreateUserCommand command)
        {
            var userId = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetUserById), new { id = userId }, userId);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserById(int id)
        {
            var user = await _mediator.Send(new GetUserByIdQuery { Id = id });
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UpdateUserCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }

            await _mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _mediator.Send(new DeleteUserCommand { Id = id });
            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult<List<UserDto>>> GetAllUsers()
        {
            var users = await _mediator.Send(new GetAllUsersQuery());
            return Ok(users);
        }
    }
}
