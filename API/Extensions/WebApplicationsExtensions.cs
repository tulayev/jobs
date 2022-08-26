using Data.Context;
using Data.Seeders;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Models;

namespace API.Extensions
{
    public static class WebApplicationsExtensions
    {
        public static async Task<WebApplication> MigrateDatabaseAsync(this WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var db = services.GetRequiredService<DbContext>();
                    var userManager = services.GetRequiredService<UserManager<User>>();
                    await db.Database.MigrateAsync();
                    await Seed.SeedData(db as AppDbContext, userManager);
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while migrating the database.");
                }
            }
            return app;
        }
    }
}