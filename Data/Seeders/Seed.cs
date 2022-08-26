using Data.Context;
using Microsoft.AspNetCore.Identity;
using Models;

namespace Data.Seeders
{
    public class Seed
    {
        public static async Task SeedData(AppDbContext ctx, UserManager<User> userManager) 
        {
            if (!userManager.Users.Any()) 
            {
                var users = new List<User>
                {
                    new User { Name = "Jon", LastName = "jon", Email = "jon@test.com" },
                    new User { Name = "Tom", LastName = "tom", Email = "tom@test.com" },
                    new User { Name = "Rob", LastName = "rob", Email = "rob@test.com" }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
        }
    }
}