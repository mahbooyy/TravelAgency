using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravelAgency.Domain.ViewModels.LoginAndRegistration;

namespace TravelAgency.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Siteinformation()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors)
                               .Select(e => e.ErrorMessage)
                               .ToList();
                return BadRequest(errors);
            }
            return Ok(model);
        }
       
    }
}
