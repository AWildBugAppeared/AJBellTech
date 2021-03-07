using AJBellTech.Core.Models;
using System.Threading.Tasks;

namespace AJBellTech.Core.Services.Interfaces
{
    public interface ITickerService
    {
        Task<TickerData> GetTickerData();
    }
}
