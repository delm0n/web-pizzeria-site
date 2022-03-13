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
            Get["/testconn"] = x => {
                List<Pizza> pizzas = new List<Pizza>();

                 using (var dbContext = new ApplicationContext())
                {
                    /*
                    dbContext.Pizzas.Add(new Pizza { Name = "Охотничья" });
                    dbContext.Pizzas.Add(new Pizza { Name = "Гавайская" });
                    

                    dbContext.SaveChanges();
                    var db = dbContext.Pizzas;
                    dbContext.Pizzas.Remove(db.Where(p => p.PizzaId > 2).FirstOrDefault());*/
                    pizzas = dbContext.Pizzas.ToList();

                } 


                //return Response.AsJson("testing axios in angular");
                return Response.AsJson(pizzas);


                //return string.Concat("testing axios in angular");
            };
        }
    }
}
