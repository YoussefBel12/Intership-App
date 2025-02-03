using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Intership.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuperVisorssfsfController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SuperVisorssfsfController(IMediator mediator)
        {
            _mediator = mediator;
        }

     

    }
}
