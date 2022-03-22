using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace serverPart.Data.Entity
{
    public class PizzaSize
    {
        public int PizzaSizeId { get; set;}
        public string NameSize { get; set; }
        public decimal Price { get; set; }
        public int Mass { get; set; }

        public int PizzaId { get; set;}
        public Pizza Pizza { get; set; }
    }
}
