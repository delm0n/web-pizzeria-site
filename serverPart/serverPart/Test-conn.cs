using Nancy;
using serverPart.Data;
using serverPart.Data.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace serverPart
{
    public class Test_conn : NancyModule
    {
        public Test_conn()
        {
            Get["/pizza"] = _ =>  {
                List<Pizza> pizzas = new List<Pizza>();

                 using (var dbContext = new ApplicationContext())
                 {
                    
                    pizzas = dbContext.Pizzas.ToList();

                 } 


                //return Response.AsJson("testing axios in angular");

                return Response.AsJson(pizzas);
            };

            Get["/sizeofpizza"] = _ => {
                List<PizzaSize> pizzaSize = new List<PizzaSize>();

                using (var dbContext = new ApplicationContext())
                {
                    pizzaSize = dbContext.PizzaSizes.ToList();

                }
                return Response.AsJson(pizzaSize);
            };

            Get["/sizeofasync/{id}", runAsync: true] = async (x, token) =>
            {
                List<PizzaSize> pizzaSize = new List<PizzaSize>();
                int param = x.id;
                using (var dbContext = new ApplicationContext())
                {
                    pizzaSize = await dbContext.PizzaSizes.Where(p => p.PizzaId == param).ToListAsync();
                }

                return Response.AsJson(pizzaSize);
            };

            Get["/sizeof/{id}"] = parameters =>
            {
                List<PizzaSize> pizzaSize = new List<PizzaSize>();
                int param = parameters.id;
                using (var dbContext = new ApplicationContext())
                {
                    pizzaSize = dbContext.PizzaSizes.Where(p => p.PizzaId == param).ToList();
                }

                return Response.AsJson(pizzaSize);
            };
        }
    }
}
