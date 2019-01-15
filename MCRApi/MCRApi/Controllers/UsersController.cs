using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MCRApi.Services;
using MCRApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MCRApi.Controllers
{
    [Route("api/[controller]")]
    // Web token is not working, due to some issues
    // [Authorize(Policy = "ApiUser")]
    [EnableCors("AllowAllOrigins")]
    public class UsersController : Controller
    {
        private MCRDbContext _context;

        public UsersController(MCRDbContext context) 
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Users.Where(o => o.id > 0).ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                return Ok(_context.Users.Where(o => o.id == id).FirstOrDefault());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult AddUser([FromBody]Users newUser)
        {
            try
            {
                _context.Add(newUser);
                _context.SaveChanges();
                return Ok(newUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult EditUser([FromBody]Users user)
        {
            try
            {
                _context.Update(user);
                _context.SaveChanges();
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
