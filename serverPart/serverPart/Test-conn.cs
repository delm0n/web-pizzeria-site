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
            Get["/test"] = x => {
                List<Pizza> pizzas = new List<Pizza>();

                 using (var dbContext = new ApplicationContext())
                 {
                    /*
                     dbContext.Pizzas.Add(new Pizza
                    {
                        Name = "Ананасовая",
                        Mass = 500,
                        Price = 390.35M,
                        Size = Sizes.Small
                    });

                    dbContext.Pizzas.Add(new Pizza
                    {
                        Name = "Ананасовая",
                        Mass = 750,
                        Price = 590.35M,
                        Size = Sizes.Middle
                    });

                    dbContext.Pizzas.Add(new Pizza
                    {
                        Name = "Ананасовая",
                        Mass = 1100,
                        Price = 890.35M,
                        Size = Sizes.Big
                    });

                    dbContext.SaveChanges();
                    
                                        dbContext.Ingredients.Add(new Ingredient
                                        {
                                            Name = "Ветчина",
                                            Mass = 25,
                                            Price = 59
                                        });

                                        dbContext.Ingredients.Add(new Ingredient
                                        {
                                            Name = "Шампиньоны",
                                            Mass = 25,
                                            Price = 59
                                        });

                                        dbContext.Ingredients.Add(new Ingredient
                                        {
                                            Name = "Красный лук",
                                            Mass = 25,
                                            Price = 59
                                        });


                                        dbContext.SaveChanges();


                                        var db = dbContext.Pizzas;
                                        dbContext.Pizzas.Remove(db.Where(p => p.PizzaId > 2).FirstOrDefault());
                                        */

                    pizzas = dbContext.Pizzas.ToList();

                 } 


                //return Response.AsJson("testing axios in angular");
                return Response.AsJson(pizzas);


                //return string.Concat("testing axios in angular");
            };
        }
    }
}
