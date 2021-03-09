using AJBellTech.Controllers;
using AJBellTech.Core.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
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

        [Fact]
        public async Task GetBtcAmountFromCurrency_ReturnsBadRequest_WhenCorrectCurrencyIsntChosen()
        {
            //Arrange
            var currency = "STR";

            //Act
            var result = (await _controller.GetBtcAmountFromCurrency(currency, 20)) as BadRequestObjectResult;

            //Assert
            Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal($"{currency} is not a valid currency to convert into BTC", result!.Value);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(1000000)]
        public async Task GetBtcAmountFromCurrency_ReturnsBadRequest_WhenAmountIsNotBetweenZeroAndAMillion(decimal amount)
        {
            //Arrange
            //Act
            var result = (await _controller.GetBtcAmountFromCurrency("GBP", amount)) as BadRequestObjectResult;

            //Assert
            Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal($"Amount: {amount} must be greater than 0 and less than 1000000", result!.Value);
        }

        [Fact]
        public async Task GetBtcAmountFromCurrency_CallsTickerService_ToConvertCurrency()
        {
            //Arrange
            var amount = 20;
            var currency = "GBP";
            
            //Act
            var result = await _controller.GetBtcAmountFromCurrency(currency, amount);

            //Assert
            _tickerService.Verify(x => x.GetBtcAmountFromCurrency(currency, amount), Times.Once);
        }

        [Fact]
        public async Task GetBtcAmountFromCurrency_ReturnsInternalServerError_IfTheClientCallFails()
        {
            //Arrange
            var amount = 20;
            var currency = "GBP";
            _tickerService.Setup(x => x.GetBtcAmountFromCurrency(currency, amount)).ReturnsAsync((decimal?)null);

            //Act
            var result = (await _controller.GetBtcAmountFromCurrency(currency, amount)) as ObjectResult;

            //Assert
            Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, result!.StatusCode);
            Assert.Equal("There was an error processing your request", result!.Value);
        }

        [Fact]
        public async Task GetBtcAmountFromCurrency_ReturnsBtcAmount()
        {
            //Arrange
            var amount = 20;
            var currency = "gbp";

            var expected = 0.00001M;
            _tickerService.Setup(x => x.GetBtcAmountFromCurrency(currency.ToUpper(), amount)).ReturnsAsync(expected);

            //Act
            var result = (await _controller.GetBtcAmountFromCurrency(currency, 20)) as OkObjectResult;

            //Assert
            Assert.IsType<OkObjectResult>(result);
            Assert.Equal(expected, result!.Value);
        }
    }
}
