using Data.Context;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddEndpointsApiExplorer();

            services.AddSwaggerGen();

            services.AddDbContext<AppDbContext>(options => {
                options.UseSqlite(config.GetConnectionString("SQLite"));
            });

            services.AddCors(options => {
                options.AddPolicy("Cors", policy => {
                    policy.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
                });
            });

            return services;
        }    
    }
}