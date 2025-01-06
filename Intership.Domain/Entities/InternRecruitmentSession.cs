namespace Intership.Domain.Entities
{
    public class InternRecruitmentSession
    {
        public int InternId { get; set; }
        public Intern Intern { get; set; }
        public int RecruitmentSessionId { get; set; }
        public RecruitmentSession RecruitmentSession { get; set; }
    }
}
