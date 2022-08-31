using Data.Context;
using Data.Repository;
using Data.Repository.IRepository;
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

            services.AddScoped<IDbRepository, DbRepository>();

            return services;
        }    
    }
}