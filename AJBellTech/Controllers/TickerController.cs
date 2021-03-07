using AJBellTech.Core.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AJBellTech.Controllers
{
    public class TickerController : BaseController
    {
        private ITickerService _tickerService;

        public TickerController(ITickerService tickerService)
        {
            _tickerService = tickerService;
        }

        [HttpGet]
        public async Task<ActionResult> GetTickerData()
        {
            var tickerData = await _tickerService.GetTickerData();
            return Ok(tickerData);
        }
    }
}
