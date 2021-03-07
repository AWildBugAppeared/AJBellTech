using System.Net.Http;
using System.Threading.Tasks;

namespace AJBellTech.Core.Clients.Interfaces
{
    public interface ITickerClient
    {
        Task<HttpResponseMessage> GetTickerData();
    }
}
