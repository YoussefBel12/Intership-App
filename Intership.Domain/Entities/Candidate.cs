using System.ComponentModel.DataAnnotations;

namespace Intership.Domain.Entities
{
    
    public class Candidate
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)] // Add max length validation
        public string FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress] // Validate email format
        [MaxLength(255)]
        public string Email { get; set; }

        

        [Required]
        [MaxLength(255)]
        public string School { get; set; }

        [Required]
        [MaxLength(50)] // Adjust as needed
        public string Level { get; set; }

        [MaxLength(255)] // Limit the path length
        public string CvFilePath { get; set; }

        [Required]
       public int RecruitmentSessionId { get; set; }

        // Navigation Property
        public RecruitmentSession RecruitmentSession { get; set; }
  

        public DateTime DateCreated { get; set; } = DateTime.UtcNow; // Set default value
    }


}


