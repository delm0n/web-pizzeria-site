using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace serverPart.Data.Helper
{
    public class DishCart
    {
        public int DishId { get; set; }

        public string Name { get; set; }

        public string UrlImg { get; set; }

        public string Structure { get; set; }

        public decimal Price { get; set; }

        public int Mass { get; set; }

        public TypesEnum DishType { get; set; }

        public int Count { get; set; }

        public enum TypesEnum
        {
            Drinks = 0,
            Desserts = 1,
            Snacks = 2,
            Rolls = 3
        }
    }
}
