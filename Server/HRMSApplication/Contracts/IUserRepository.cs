using HRMSApplication.Models;

namespace HRMSApplication.Contracts
{
    public interface IUserRepository
    {
        public Task Create(User user);
        public Task Delete(User user);
        public Task<User?> Get(string username = null,string email = null); // retuns User if found else null
        public Task Update(string username,string password);
    }
}
