using System.Net.Http;
using System.Threading.Tasks;

namespace AJBellTech.Core.Clients.Interfaces
{
    public interface ITickerClient
    {
        Task<HttpResponseMessage> GetBtcAmountFromCurrency(string currency, decimal amount);
        Task<HttpResponseMessage> GetTickerData();
    }
}
