// Intership.Infrastructure.Identity/UploadCvHandler.cs
using Intership.Application.Commands;
using Intership.Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace Intership.Infrastructure.Identity
{
    public class UploadCvHandler : IRequestHandler<UploadCvCommand, string>
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILocalCvFileStorageService _localCvFileStorageService;

        public UploadCvHandler(UserManager<ApplicationUser> userManager, ILocalCvFileStorageService localCvFileStorageService)
        {
            _userManager = userManager;
            _localCvFileStorageService = localCvFileStorageService;
        }

        public async Task<string> Handle(UploadCvCommand request, CancellationToken cancellationToken)
        {
            // Validate file type (only PDF allowed)
            if (request.File == null || request.File.Length == 0)
                throw new ArgumentException("File is required.");

            if (request.File.ContentType != "application/pdf")
                throw new ArgumentException("Only PDF files are allowed.");

            // Get the user (ApplicationUser)
            var user = await _userManager.FindByIdAsync(request.UserId);
            if (user == null)
                throw new ArgumentException("User not found.");

            // Store the file and get the relative file path
            string fileUrl = await _localCvFileStorageService.StoreCvFileAsync(request.File);

            // Update the user's CvFileUrl property
            user.CvFileUrl = fileUrl;
            await _userManager.UpdateAsync(user);

            return fileUrl;  // Return the file URL to be used by the controller
        }
    }
}
