using Data.Context;
using Data.Repository.IRepository;

namespace Data.Repository
{
    public class DbRepository : IDbRepository
    {
        private readonly AppDbContext _db;

        public IJobRepository JobRepository { get; private set; }

        public DbRepository(AppDbContext db)
        {
            _db = db;
            JobRepository = new JobRepository(db);
        }

        public async Task<bool> SaveAsync()
        {
            return await _db.SaveChangesAsync() > 0;   
        }
    }
}