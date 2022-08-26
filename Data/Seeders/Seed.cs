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
                await userManager.CreateAsync(new User { Name = "Jon", LastName = "Snow", Email = "jon@test.com", UserName = "jon@test.com" }, "Pa$$w0rd");
            }
        }
    }
}