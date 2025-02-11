using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Intership.Application.Interfaces
{
    public interface ILocalCvFileStorageService
    {
        Task<string> StoreCvFileAsync(IFormFile file);  // Stores the CV file and returns the file URL
        Task<string> GetFileUrlAsync(string fileName);  // Get the file URL from the storage

        // New methods for ApplicationUser
        Task<string> StoreUserCvFileAsync(IFormFile file, string userId);
        Task<string> GetUserCvFileUrlAsync(string userId);
    }
}
