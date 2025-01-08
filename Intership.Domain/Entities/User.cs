using System.Collections.Generic;
using System.Data;
using Microsoft.AspNetCore.Identity;

namespace Intership.Domain.Entities
{
    public class User 
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
       public string Email { get; set; }
       public string Password { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }
    }
}
