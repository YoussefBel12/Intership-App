using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Intership.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Intership.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        // For intern accounts, this property will hold the assigned supervisor's user ID.
        // For admin or supervisor accounts, this remains null.
        public string? SupervisorId { get; set; }


        // 🔹 Navigation property to fetch assigned interns
        public virtual ICollection<ApplicationUser> SupervisedInterns { get; set; } = new List<ApplicationUser>();

    }

}
