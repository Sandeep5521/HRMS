using HRMSApplication.Contracts;
using HRMSApplication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRMSApplication.Controllers
{
    [Route("user")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService userService;
        private readonly AuthService auth;

        public UserController(IUserService service,AuthService authService) {
            this.userService = service;
            this.auth = authService;
        }

        [HttpPost]
        [Route("token")]
        public IActionResult Token(User user) {
            try
            {
                string token = auth.GenerateToken(user.UserName+"HRMS");
                return Ok(token);

            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> emailExists(string email)
        {
            try
            {
                //var itm = Request.Headers.Authorization;
                var itm = await userService.EmailExists(email);
                if (itm != null) return Ok(new { result = "Success", value = itm });
                return Unauthorized(new { result = "Error", value = "Invalid Email" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        [Route("register")]
        public IActionResult register(User user)
        {
            try
            {
                userService.OnRegister(user);
                return Ok();
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> login(User user) {
            if (await userService.UserExists(user.UserName,user.Password) == true)
            {
                string token = auth.GenerateToken(user.UserName);
                return Ok(new { result="Success",value=token });
            }
            return Unauthorized(new { result = "Error", value = "Invalid username or password" });
        }
    }
}
