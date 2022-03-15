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
    public enum Sizes
    {
        //[Description("Маленькая")]
        Small,

        //[Description("Средняя")]
        Middle,

        //[Description("Большая")]
        Big
    }
    public class Pizza : Dish
    {
        public int PizzaId { get; set; }
        
        public Sizes Size { get; set; }

        //состав
        
    }
}
