namespace Intership.Application.DTOs
{
    public class RecruitmentSessionDto
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public DateTime DateCreated { get; set; }

        public DateTime DateEnded { get; set; }

        

    }
}


