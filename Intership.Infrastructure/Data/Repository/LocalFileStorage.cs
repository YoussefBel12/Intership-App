using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Intership.Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Intership.Infrastructure.Data.Repository
{
    public class LocalFileStorageService : IFileStorageService
    {
        private readonly string _basePath;

        public LocalFileStorageService(string basePath) // Inject the base path
        {
            _basePath = basePath;
        }

        public async Task<string> StoreFileAsync(IFormFile file, string containerName)
        {
            if (file == null || file.Length == 0)
            {
                return null; // Or throw an exception
            }

            string uploadsFolder = Path.Combine(_basePath, containerName);
            Directory.CreateDirectory(uploadsFolder); // Ensure directory exists

            string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return Path.Combine(containerName, uniqueFileName); // Store relative path in db
        }



        // Expose the base path through this method
        public string GetBasePath()
        {
            return _basePath;
        }


    }
}
