using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BChefApi.Models
{
    public class SandMessage
    {
        public int Chat_ID { get; set; }
        public string TextMassege { get; set; }
        public int UserID { get; set; }
        public string TimeSend { get; set; }
    }
}