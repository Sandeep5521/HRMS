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

        [HttpGet]
        [Route("token")]
        public IActionResult Token(string user) {
            try
            {
                string token = auth.GenerateToken(user);
                return Ok(token);

            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        public IActionResult userExists(string id)
        {
            try
            {
                var itm = Request.Headers.Authorization;
                return Ok(userService.UserExists(id));
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
        [Authorize]
        [Route("login")]
        public IActionResult login() {
            return Ok("Hello world");
        }
    }
}
