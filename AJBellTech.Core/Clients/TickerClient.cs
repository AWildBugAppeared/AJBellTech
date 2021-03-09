using AJBellTech.Core.Clients.Interfaces;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace AJBellTech.Core.Clients
{
    public class TickerClient : ITickerClient
    {
        private readonly HttpClient _client;

        public TickerClient(HttpClient httpClient)
        {
            httpClient.BaseAddress = new Uri("https://blockchain.info/ticker");
            _client = httpClient;
        }

        public async Task<HttpResponseMessage> GetBtcAmountFromCurrency(string currency, decimal amount)
        {
            currency = currency.ToUpper();
            var response = await _client.GetAsync($"/tobtc?currency={currency}&value={amount}");
            return response;
        }

        public async Task<HttpResponseMessage> GetTickerData()
        {
            var response = await _client.GetAsync("");
            return response;
        }
    }
}
