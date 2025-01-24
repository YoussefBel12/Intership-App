using Intership.Application.DTOs;
//using Intership.Application.Queries.GetAllUsers;
//using Intership.Application.Queries.GetUserById;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Intership.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuperVisorsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SuperVisorsController(IMediator mediator)
        {
            _mediator = mediator;
        }

     

    }
}
