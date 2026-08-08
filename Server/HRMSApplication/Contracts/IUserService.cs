using HRMSApplication.Models;

namespace HRMSApplication.Contracts
{
    public interface IUserService
    {
        public Task OnLogin();

        public Task<bool> UserExists(string username);

        public Task OnRegister(User user);
    }
}
