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
        public DateTime DateEnded { get; set; }

     public ICollection<Candidate> Candidates { get; set; }

    }
}
