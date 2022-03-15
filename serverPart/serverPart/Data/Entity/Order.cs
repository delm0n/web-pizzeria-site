using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace serverPart.Data.Entity
{
    public class Order
    {
        public int OrderId { get; set; }

        //public string Json_dessert { get; set; } = null;

        //public string Json_dish { get; set; } = null;

        //public string Json_drink { get; set; } = null;

        //public string Json_salad { get; set; } = null;

        //public string Json_snack { get; set; } = null;

        //public string Json_pizza { get; set; } = null;

        public Client client { get; set; }
    }
}
