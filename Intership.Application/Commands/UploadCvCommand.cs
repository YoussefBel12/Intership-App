using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Intership.Application.Commands
{
    public class UploadCvCommand : IRequest<string>
    {
        public string UserId { get; set; }
        public IFormFile File { get; set; }
    }
}
