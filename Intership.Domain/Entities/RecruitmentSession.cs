using System;
using System.Collections.Generic;

namespace Intership.Domain.Entities
{
    public class RecruitmentSession
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public DateTime DateCreated { get; set; }
        public int SupervisorId { get; set; }
        public SuperVisor SuperVisor { get; set; }
        public ICollection<Candidate> Candidates { get; set; }
        public ICollection<InternRecruitmentSession> InternRecruitmentSessions { get; set; }
    }
}
