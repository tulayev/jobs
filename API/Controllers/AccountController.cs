using System.Security.Claims;
using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        
        private readonly SignInManager<User> _signInManager;
        
        private readonly TokenService _tokenService;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, TokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
                return BadRequest("Email or Password is incorrect");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return GetUserObject(user);
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto RegisterDto)
        {
            if (await _userManager.Users.AnyAsync(u => u.Email == RegisterDto.Email))
            {
                ModelState.AddModelError("email", "Email is already taken");
                return ValidationProblem();
            }

            var user = new User
            {
                Email = RegisterDto.Email,
                UserName = RegisterDto.Email,
                Name = RegisterDto.Name,
                LastName = RegisterDto.LastName,
                Location = "my city"
            };

            var result = await _userManager.CreateAsync(user, RegisterDto.Password);

            if (result.Succeeded)
            {
                return GetUserObject(user);
            }

            return BadRequest("Error occured during the registration proccess");
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return GetUserObject(user);
        }

        private UserDto GetUserObject(User user) => new UserDto
            {
                Name = user.Name,
                LastName = user.LastName,
                Location = user.Location,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            };
    }
}