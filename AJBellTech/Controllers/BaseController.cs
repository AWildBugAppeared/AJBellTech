using Microsoft.AspNetCore.Mvc;

namespace AJBellTech.Controllers
{
    [ApiController]
    [Route("[controller]/[action]/{id?}")]
    public class BaseController : ControllerBase
    {
    }
}
