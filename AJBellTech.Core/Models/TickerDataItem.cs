using Newtonsoft.Json;

namespace AJBellTech.Core.Models
{
    public class TickerDataItem
    {
        public decimal Buy { get; set; }

        [JsonProperty("15m")]
        public decimal FifteenMinute { get;set; }
        public decimal Last { get; set; }
        public decimal Sell { get; set; }
        public string Symbol { get; set; }
    }
}
