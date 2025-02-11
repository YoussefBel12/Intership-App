using Intership.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;

namespace Intership.Infrastructure.Identity
{
    public class LocalCvFileStorageService : ILocalCvFileStorageService
    {
        private readonly string _cvFolderPath;

        public LocalCvFileStorageService(string cvFolderPath)
        {
            _cvFolderPath = cvFolderPath;
        }

        public async Task<string> StoreCvFileAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return null;

            string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", _cvFolderPath);
            Directory.CreateDirectory(uploadsFolder);  // Ensure directory exists

            string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return Path.Combine(_cvFolderPath, uniqueFileName);  // Store relative path in db
        }

        public async Task<string> GetFileUrlAsync(string fileName)
        {
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", _cvFolderPath, fileName);
            if (!File.Exists(filePath))
                return null;

            return filePath;
        }

        // New methods for ApplicationUser
        public async Task<string> StoreUserCvFileAsync(IFormFile file, string userId)
        {
            if (file == null || file.Length == 0)
                return null;

            string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", _cvFolderPath, userId);
            Directory.CreateDirectory(uploadsFolder);  // Ensure directory exists

            string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return Path.Combine(_cvFolderPath, userId, uniqueFileName);  // Store relative path in db
        }

        public async Task<string> GetUserCvFileUrlAsync(string userId)
        {
            string userFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", _cvFolderPath, userId);
            if (!Directory.Exists(userFolder))
                return null;

            var files = Directory.GetFiles(userFolder);
            if (files.Length == 0)
                return null;

            return files[0];  // Assuming only one CV file per user
        }
    }
}

