using HRMSApplication.Contracts;
using HRMSApplication.Data;
using HRMSApplication.Models;

namespace HRMSApplication.Services
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDBContext _dbContext;

        public UserRepository(AppDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public async Task Create(User user)
        {
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(User user)
        {
            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<User?> Get(string username = null,string email = null)
        {
            if(email != null) return _dbContext.Users.Where(x=>x.Email == email).FirstOrDefault();
            return _dbContext.Users.Where(x => x.UserName == username).FirstOrDefault();
        }

        public async Task Update(string username,string password)
        {
            User user = _dbContext.Users.Where(x=>x.UserName == username).FirstOrDefault();
            if (user != null) {
                user.Password = password;
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
