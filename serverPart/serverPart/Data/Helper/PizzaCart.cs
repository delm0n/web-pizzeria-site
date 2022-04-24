using Newtonsoft.Json;
using serverPart.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace serverPart.Data.Helper
{
    public class PizzaCart
    {
        public int PizzaId { get; set; }
        public string PizzaName { get; set; }
        public string UrlImg { get; set; }
        public string Structure { get; set; }

        [JsonProperty("size")]
        public PizzaSize Size { get; set; }

        [JsonProperty("ingredients")]
        public List<Ingredient> Ingredients { get; set; }
        public int Count { get; set; }

        public TypesPizzaEnum PizzaType { get; set; }

        public enum TypesPizzaEnum
        {
            Usual = 0,
            Spicy = 1,
            Meatless = 2,
        }

    }
}
