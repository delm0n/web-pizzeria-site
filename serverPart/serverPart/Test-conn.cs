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
                    /*dbContext.Pizzas.Add(new Pizza
                    {
                        PizzaName = "Ананасовая",
                        MinPrice = 390.35M 
                    });
                    dbContext.Pizzas.Add(new Pizza
                    {
                        PizzaName = "Охотничья",
                        MinPrice = 340.85M
                    });
                    dbContext.SaveChanges(); 

                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        Name = "Маленькая",
                        Mass = 400,
                        Price = 390.35M,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Ананасовая").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        Name = "Средняя",
                        Mass = 550,
                        Price = 460.35M,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Ананасовая").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        Name = "Большая",
                        Mass = 800,
                        Price = 680.35M,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Ананасовая").FirstOrDefault(),
                    });


                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        Name = "Маленькая",
                        Mass = 400,
                        Price = 340.85M,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Охотничья").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        Name = "Средняя",
                        Mass = 550,
                        Price = 460.85M,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Охотничья").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        Name = "Большая",
                        Mass = 800,
                        Price = 780.85M,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Охотничья").FirstOrDefault(),
                    });
                    dbContext.SaveChanges();



                    
                     

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

            Get["/testsize"] = x => {
                List<PizzaSize> pizzaSize = new List<PizzaSize>();

                using (var dbContext = new ApplicationContext())
                {
                    pizzaSize = dbContext.PizzaSizes.ToList();

                }


                //return Response.AsJson("testing axios in angular");
                return Response.AsJson(pizzaSize);


                //return string.Concat("testing axios in angular");
            };
        }
    }
}
