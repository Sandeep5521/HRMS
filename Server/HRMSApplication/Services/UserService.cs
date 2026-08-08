using HRMSApplication.Contracts;
using HRMSApplication.Models;

namespace HRMSApplication.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository) { _userRepository = userRepository; }
        public async Task OnLogin()
        {
        }

        public async Task OnRegister(User user)
        {
            await _userRepository.Create(user);
        }

        public async Task<bool> UserExists(string username)
        {
            User user = await _userRepository.Get(username);
            return (user != null);
        }
    }
}
