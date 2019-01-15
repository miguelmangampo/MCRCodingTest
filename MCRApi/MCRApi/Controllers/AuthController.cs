using System.Security.Claims;
using System.Threading.Tasks;
using MCRApi.Auth;
using MCRApi.Helpers;
using MCRApi.Models;
using MCRApi.Services;
using MCRApi.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MCRApi.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly MCRDbContext _context;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;

        public AuthController(MCRDbContext context, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions)
        {
            _context = context;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
        }

        [HttpPost]
        public IActionResult AddUser([FromBody]Users newUser)
        {
            try
            {
                return Ok("OK");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Post([FromBody]Users credentials)
        {
            var identity = await GetClaimsIdentity(credentials.username, credentials.password);
            if (identity == null)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
            }

            var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, credentials.username, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });
            return new OkObjectResult(jwt);
        }


        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            // get the user to verifty
            var user = _context.Users.Where(o => o.username == userName).FirstOrDefault();

            if (user == null) return await Task.FromResult<ClaimsIdentity>(null);

            // check the credentials
            if (user.password == password)
            {
                return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, user.id.ToString()));
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }
    }
}
