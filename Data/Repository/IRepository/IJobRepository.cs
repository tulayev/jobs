using Models;

namespace Data.Repository.IRepository
{
    public interface IJobRepository : IRepository<Job>
    {
        Task UpdateAsync(Job job);
    }
}