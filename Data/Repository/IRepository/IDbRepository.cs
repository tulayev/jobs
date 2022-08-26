namespace Data.Repository.IRepository
{
    public interface IDbRepository
    {
        public IJobRepository JobRepository { get; }

        Task<bool> SaveAsync();
    }
}