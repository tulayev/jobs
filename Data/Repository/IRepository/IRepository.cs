using System.Linq.Expressions;

namespace Data.Repository.IRepository
{
    public interface IRepository<T> where T : class
    {
        Task<T> GetAsync(int id);

        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includes = null);

        Task<T> GetFirstOrDefaultAsync(Expression<Func<T, bool>> filter = null, string includes = null);

        void Add(T entity);

        void Remove(int id);
        
        void Remove(T entity);
        
        void RemoveRange(IEnumerable<T> entity);
    }
}