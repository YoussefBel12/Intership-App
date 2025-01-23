using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Intership.Application.Interfaces
{
    public interface IFileStorageService
    {
        Task<string> StoreFileAsync(IFormFile file, string containerName); // Container name for organization
    }
}
