using HRMSApplication.Models;

namespace HRMSApplication.Contracts
{
    public interface IUserService
    {
        public Task OnLogin();

        public Task<bool> UserExists(string username,string password = null);
        public Task<string> EmailExists(string email);

        public Task OnRegister(User user);
    }
}
