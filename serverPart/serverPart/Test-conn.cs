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
