using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravelAgency.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Siteinformation()
        {
            return View();
        }
    }
}
