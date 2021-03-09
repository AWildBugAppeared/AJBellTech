using AJBellTech.Core.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AJBellTech.Core.Constants;

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

        [HttpGet]
        public async Task<ActionResult> GetBtcAmountFromCurrency([FromQuery] string currency, decimal amount)
        {
            currency = currency.ToUpper();
            if (!BTC.AcceptableCurrenciesForBtcConversion.Contains(currency))
                return BadRequest($"{currency} is not a valid currency to convert into BTC");

            if (amount <= 0 || amount >= 1000000)
                return BadRequest($"Amount: {amount} must be greater than 0 and less than 1000000");

            var btcValue = await _tickerService.GetBtcAmountFromCurrency(currency, amount);

            if (btcValue is null)
                return StatusCode(500, "There was an error processing your request");

            return Ok(btcValue);
        }
    }
}
