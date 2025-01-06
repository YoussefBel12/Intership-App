namespace Intership.Application.DTOs
{
    public class InternDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string School { get; set; }
        public string Level { get; set; }
        public int? SupervisorId { get; set; }
        public DateTime DateCreated { get; set; }
        public string SupervisorName { get; set; }
        public List<RecruitmentSessionDto> RecruitmentSessions { get; set; }
    }
}
