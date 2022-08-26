using Microsoft.AspNetCore.Identity;

namespace Models
{
    public class User : IdentityUser
    {
        public string Name { get; set; }   
        
        public string LastName { get; set; }
           
        public string Location { get; set; }   
    }
}