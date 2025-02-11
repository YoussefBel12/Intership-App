using System.Threading.Tasks;
using Intership.Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Intership.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserCvController : ControllerBase
    {
        private readonly UserCvService _userCvService;

        public UserCvController(UserCvService userCvService)
        {
            _userCvService = userCvService;
        }

        [HttpPost("{userId}/upload")]
        public async Task<IActionResult> UploadCv(string userId, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Invalid file");

            string cvFilePath = await _userCvService.StoreUserCvFileAsync(file, userId);
            return Ok(new { FilePath = cvFilePath });
        }

        [HttpGet("{userId}/cv")]
        public async Task<IActionResult> GetCv(string userId)
        {
            string cvFilePath = await _userCvService.GetUserCvFileUrlAsync(userId);
            if (cvFilePath == null)
                return NotFound("CV file not found");

            string fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", cvFilePath);
            return PhysicalFile(fullPath, "application/pdf");
        }
    }
}
