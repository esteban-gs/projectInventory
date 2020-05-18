using Core.Specs;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        IEnumerable<TEntity> Find(ISpecification<TEntity> specification = null);
        Task<TEntity> FindById(int id);
        //
        Task Add(TEntity entity);
        Task AddRange(IEnumerable<TEntity> entities);
        //
        void Remove(TEntity entity);
        void RemoveRange(IEnumerable<TEntity> entities);
        //
        void Update(TEntity entity);
        //
        bool Contains(ISpecification<TEntity> specification = null);
        Task<bool> Contains(Expression<Func<TEntity, bool>> predicate);
        //
        int Count(ISpecification<TEntity> specification = null);
        Task<int> CountAsync(Expression<Func<TEntity, bool>> predicate);


    }
}
