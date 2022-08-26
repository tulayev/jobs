using Data.Context;
using Data.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Data.Repository
{
    public class JobRepository : Repository<Job>, IJobRepository
    {
        private readonly AppDbContext _db;

        public JobRepository(AppDbContext db) : base(db)
        {
            _db = db;
        }

        public async Task UpdateAsync(Job job)
        {
            var jobFromDb = await _db.Jobs.FirstOrDefaultAsync(j => j.Id == job.Id);

            if (jobFromDb != null)
            {
                jobFromDb.Name = job.Name;
            }
        }
    }
}