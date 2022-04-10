using Nancy;
using serverPart.Data;
using serverPart.Data.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace serverPart.RouterModule
{
    public class StartUp : NancyModule
    {
        public StartUp()
        {
            Get["/start", runAsync: true] = async (x, token) =>
            {
                using (var dbContext = new ApplicationContext())
                {
                    /* dbContext.Desserts.Add(new Dessert
                    {   
                        Name = "Чизкейк", UrlImg = "/assets/img/cheesecake.png", Mass = 95, Price =90
                    });
                    await dbContext.SaveChangesAsync(); */
                    /* dbContext.Pizzas.Add(new Pizza
                    {
                        PizzaName = "Гавайская",
                        UrlImg = "/assets/img/hawaiian.jpg",
                        MinPrice = 390.35M,
                        Structure = "Сыр Моцарелла, ветчина, ананасы и фирменный соус"
                    });
                    dbContext.Pizzas.Add(new Pizza
                    {
                        PizzaName = "Ветчина / грибы",
                        UrlImg = "/assets/img/hunting.jpg",
                        MinPrice = 340.85M,
                        Structure = "Сыр Моцарелла, ветчина, шампиньоны и фирменный соус"
                    });
                    dbContext.Pizzas.Add(new Pizza
                    {
                        PizzaName = "Греческая",
                        UrlImg = "/assets/img/greek.jpg",
                        MinPrice = 360.35M,
                        Structure = "Сыр Моцарелла, шампиньоны, болгарский перец, помидоры, маслины и фирменный соус"
                    });
                    dbContext.Pizzas.Add(new Pizza
                    {
                        PizzaName = "4 сыра",
                        UrlImg = "/assets/img/cheese.jpg",
                        MinPrice = 310.85M,
                        Structure = "Сыр Моцарелла, сыр Тильзитер, сыр Пармезан, сыр с голубой плесенью и сливочный соус"
                    }); */

                    /* dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Маленькая",
                        Mass = 400,
                        Price = 340.85M,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Ветчина / грибы").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Средняя",
                        Mass = 600,
                        Price = 460.85M,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Ветчина / грибы").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Большая",
                        Mass = 800,
                        Price = 690.85M,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Ветчина / грибы").FirstOrDefault(),
                    });

                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Маленькая",
                        Mass = 400,
                        Price = 390.35M,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Гавайская").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Средняя",
                        Mass = 600,
                        Price = 460.85M,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Гавайская").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Большая",
                        Mass = 800,
                        Price = 690.85M,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Гавайская").FirstOrDefault(),
                    });

                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Маленькая",
                        Mass = 400,
                        Price = 360.35M,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Греческая").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Средняя",
                        Mass = 600,
                        Price = 460.35M,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Греческая").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Большая",
                        Mass = 800,
                        Price = 695.55M,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Греческая").FirstOrDefault(),
                    });

                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Маленькая",
                        Mass = 400,
                        Price = 310.85M,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "4 сыра").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Средняя",
                        Mass = 600,
                        Price = 420.85M,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "4 сыра").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Большая",
                        Mass = 800,
                        Price = 670.85M,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "4 сыра").FirstOrDefault(),
                    });

                    await dbContext.SaveChangesAsync(); */
                }

                return 0;
            };

        }
    }
}
