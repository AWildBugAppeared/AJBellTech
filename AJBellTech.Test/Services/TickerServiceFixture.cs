using AJBellTech.Core.Clients.Interfaces;
using AJBellTech.Core.Models;
using AJBellTech.Core.Services;
using AJBellTech.Test.TestHelpers;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace AJBellTech.Test.Services
{
    public class TickerServiceFixture
    {
        private Mock<ITickerClient> _tickerClient;
        private TickerService _service;

        public TickerServiceFixture()
        {
            _tickerClient = new Mock<ITickerClient>();

            _service = new TickerService(_tickerClient.Object);
        }

        [Fact]
        public async Task GetTickerData_CallsTickerClient_ToGetTickerData()
        {
            //Arrange
            _tickerClient.Setup(x => x.GetTickerData()).ReturnsAsync(new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(ClientData.TickerResponseContent, System.Text.Encoding.UTF8, "application/json")
            });

            //Act
            var result = await _service.GetTickerData();

            //Assert
            _tickerClient.Verify(x => x.GetTickerData(), Times.Once);
        }

        [Fact]
        public async Task GetTickerData_ReturnsNull_IfNonSuccessCode()
        {
            //Arrange
            _tickerClient.Setup(x => x.GetTickerData()).ReturnsAsync(new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest });

            //Act
            var result = await _service.GetTickerData();

            //Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task GetTickerData_ReturnsTickerData_IfClientCallWasSuccessful()
        {
            //Arrange
            _tickerClient.Setup(x => x.GetTickerData()).ReturnsAsync(new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(ClientData.TickerResponseContent, System.Text.Encoding.UTF8, "application/json")
            });

            //Act
            var result = await _service.GetTickerData();

            //Assert
            Assert.IsType<TickerData>(result);
        }

        [Fact]
        public async Task GetBtcAmountFromCurrency_CallsTickerClient_ToConvertCurrency()
        {
            //Arrange
            var amount = 20;
            var currency = "GBP";

            _tickerClient.Setup(x => x.GetBtcAmountFromCurrency(It.IsAny<string>(), It.IsAny<decimal>())).ReturnsAsync(new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("1", Encoding.UTF8, "application/json")
            });

            //Act
            var result = await _service.GetBtcAmountFromCurrency(currency, amount);

            //Assert
            _tickerClient.Verify(x => x.GetBtcAmountFromCurrency(currency, amount), Times.Once);
        }

        [Fact]
        public async Task GetBtcAmountFromCurrency_ReturnsNull_IfNonSuccessCode()
        {
            //Arrange
            _tickerClient.Setup(x => x.GetBtcAmountFromCurrency(It.IsAny<string>(), It.IsAny<decimal>()))
                .ReturnsAsync(new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest });

            //Act
            var result = await _service.GetBtcAmountFromCurrency("GBP", 20);

            //Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task GetBtcAmountFromCurrency_ReturnsBtcAmount_IfClientCallWasSuccessful()
        {
            //Arrange
            var expected = 0.05357124M;
            _tickerClient.Setup(x => x.GetBtcAmountFromCurrency(It.IsAny<string>(), It.IsAny<decimal>())).ReturnsAsync(new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(expected.ToString(), Encoding.UTF8, "application/json")
            });

            //Act
            var result = await _service.GetBtcAmountFromCurrency("GBP", 20);

            //Assert
            Assert.Equal(expected, result);
        }
    }
}
