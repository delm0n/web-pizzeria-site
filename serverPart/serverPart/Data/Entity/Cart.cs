using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace serverPart.Data.Entity
{
    public class Cart
    {
        [Key]
        [ForeignKey("Client")]
        public int ClientId { get; set; }

        public string PizzaIdJson { get; set; } = "";
        public string PizzaSizeIdJson { get; set; } = "";
        public string PizzaIngredientIdJson { get; set; } = "";
        public string PizzaCount { get; set; } = "";

        public string AddishIdJson { get; set; } = "";

        //public int ClientId { get; set; }
        public Client Client { get; set; }
    }
}
