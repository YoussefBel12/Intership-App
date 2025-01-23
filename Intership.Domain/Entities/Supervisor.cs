using System.Collections.Generic;

namespace Intership.Domain.Entities
{
    public class SuperVisor
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public ICollection<Intern> Interns { get; set; }
 //       public ICollection<RecruitmentSession> RecruitmentSessions { get; set; }
    }
}
