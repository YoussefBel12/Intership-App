using System.Threading.Tasks;
using Intership.Application.Interfaces;
using Intership.Infrastructure.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Intership.Infrastructure.Services
{
    public class UserCvService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILocalCvFileStorageService _fileStorageService;

        public UserCvService(UserManager<ApplicationUser> userManager, ILocalCvFileStorageService fileStorageService)
        {
            _userManager = userManager;
            _fileStorageService = fileStorageService;
        }

        public async Task<string> StoreUserCvFileAsync(IFormFile file, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                throw new Exception("User not found");

            string cvFilePath = await _fileStorageService.StoreUserCvFileAsync(file, userId);
            user.CvFileUrl = cvFilePath;
            await _userManager.UpdateAsync(user);

            return cvFilePath;
        }

        public async Task<string> GetUserCvFileUrlAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                throw new Exception("User not found");

            return user.CvFileUrl;
        }
    }
}
