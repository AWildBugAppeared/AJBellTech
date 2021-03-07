using AJBellTech.Controllers;
using AJBellTech.Core.Services.Interfaces;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace AJBellTech.Test.Controllers
{
    public class TickerControllerFixture
    {
        private Mock<ITickerService> _tickerService;
        private TickerController _controller;

        public TickerControllerFixture()
        {
            _tickerService = new Mock<ITickerService>();
            _controller = new TickerController(_tickerService.Object);
        }

        [Fact]
        public async Task GetTickerData_CallsTickerService_ToReturnTickerData()
        {
            //Arrange
            //Act
            var result = await _controller.GetTickerData();

            //Assert
            _tickerService.Verify(x => x.GetTickerData(), Times.Once);
        } 
    }
}
