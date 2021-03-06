using AJBellTech.Core.Clients.Interfaces;
using AJBellTech.Core.Models;
using AJBellTech.Core.Services.Interfaces;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace AJBellTech.Core.Services
{
    public class TickerService : ITickerService
    {
        private ITickerClient _tickerClient;

        public TickerService(ITickerClient tickerClient)
        {
            _tickerClient = tickerClient;
        }

        public async Task<decimal?> GetBtcAmountFromCurrency(string currency, decimal amount)
        {
            var response = await _tickerClient.GetBtcAmountFromCurrency(currency, amount);

            if (!response.IsSuccessStatusCode)
                return null;

            var tickerData = JsonConvert.DeserializeObject<decimal>(await response.Content.ReadAsStringAsync());
            return tickerData;
        }

        public async Task<TickerData> GetTickerData()
        {
            var response = await _tickerClient.GetTickerData();

            if (!response.IsSuccessStatusCode)
                return null;

            var tickerData = JsonConvert.DeserializeObject<TickerData>(await response.Content.ReadAsStringAsync());
            return tickerData;
        }
    }
}
 