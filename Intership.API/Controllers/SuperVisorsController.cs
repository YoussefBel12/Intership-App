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
