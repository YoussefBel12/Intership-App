namespace Intership.Domain.Entities
{
    public class Candidate
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string School { get; set; }
        public string Level { get; set; }
        public string CvFilePath { get; set; }
        public int RecruitmentSessionId { get; set; }
        public RecruitmentSession RecruitmentSession { get; set; }
        public DateTime DateCreated { get; set; } // New property
    }
}
