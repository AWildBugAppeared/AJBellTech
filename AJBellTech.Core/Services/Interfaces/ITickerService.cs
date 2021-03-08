using AJBellTech.Core.Models;
using System.Threading.Tasks;

namespace AJBellTech.Core.Services.Interfaces
{
    public interface ITickerService
    {
        Task<decimal?> GetBtcAmountFromCurrency(string currency, decimal amount);
        Task<TickerData> GetTickerData();
    }
}
