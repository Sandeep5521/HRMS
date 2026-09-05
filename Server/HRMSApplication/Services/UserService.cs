using HRMSApplication.Contracts;
using HRMSApplication.Models;

namespace HRMSApplication.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository) { _userRepository = userRepository; }

        public async Task<string> EmailExists(string email)
        {
            if(email != null || email != string.Empty)
            {
                var user = await _userRepository.Get(email: email);
                if (user != null) {
                    return user.UserName;
                }
            }
            return null;
        }

        public async Task OnLogin()
        {
        }

        public async Task OnRegister(User user)
        {
            await _userRepository.Create(user);
        }

        public async Task<bool> UserExists(string username, string password = null)
        {
            User user = await _userRepository.Get(username);
            if (user != null)
            {
                if (password == null) return true;
                else if(password == user.Password) return true;
            }
            return false;
        }
    }
}
