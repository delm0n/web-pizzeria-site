using Nancy;
using serverPart.Data;
using serverPart.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace serverPart
{
    public class Test_conn : NancyModule
    {
        public Test_conn()
        {
            Get["/test"] = _ =>  {
                List<Pizza> pizzas = new List<Pizza>();

                 using (var dbContext = new ApplicationContext())
                 {
                    pizzas = dbContext.Pizzas.ToList();

                 } 


                //return Response.AsJson("testing axios in angular");

                return Response.AsJson(pizzas);
            };

            Get["/testsize"] = x => {
                List<PizzaSize> pizzaSize = new List<PizzaSize>();

                using (var dbContext = new ApplicationContext())
                {
                    pizzaSize = dbContext.PizzaSizes.ToList();

                }
                return Response.AsJson(pizzaSize);
            };
        }
    }
}
