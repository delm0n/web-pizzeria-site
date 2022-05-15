using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Threading.Tasks;


namespace serverPart.Data.Entity
{
    public class Pizza
    {
        public int PizzaId { get; set; }

        public string UrlImg { get; set; }

        public string PizzaName { get; set; }
        
        public string Structure { get; set; }

        public decimal MinPrice { get; set;}

        public double Rating { get; set; } = 5; //изначальный рейтинг всех пицц = 5

        public int СountOrder { get; set; } = 0; //количество заказов пиццы



        public string IdClientRateJson { get; set; } = ""; //id клиента, оценившего пиццу, хранится в массиве JSON

        public string ClientRateJson { get; set; } = ""; //оценка клиента хранится в массиве JSON



        public ICollection<PizzaSize> PizzaSizes { get; set; }

        public TypesPizzaEnum PizzaType { get; set; }

        public enum TypesPizzaEnum
        {
            Usual = 0,
            Spicy = 1,
            Meatless = 2,
        }

        

    }
}
