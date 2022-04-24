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
                    /*
                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Coca-Cola",
                        UrlImg = "/assets/img/cola.png",
                        Mass = 500,
                        Price = 85,
                        Structure = "",
                        DishType = Dish.TypesEnum.Drinks
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Sprite",
                        UrlImg = "/assets/img/sprite.png",
                        Mass = 500,
                        Price = 85,
                        Structure = "",
                        DishType = Dish.TypesEnum.Drinks
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Fanta",
                        UrlImg = "/assets/img/fanta.png",
                        Mass = 500,
                        Price = 85,
                        Structure = "",
                        DishType = Dish.TypesEnum.Drinks
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Bon Aqua",
                        UrlImg = "/assets/img/bonaqua.png",
                        Mass = 500,
                        Price = 65,
                        Structure = "",
                        DishType = Dish.TypesEnum.Drinks
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Сок мультифрукт",
                        UrlImg = "/assets/img/jumul.png",
                        Mass = 1000,
                        Price = 120,
                        Structure = "",
                        DishType = Dish.TypesEnum.Drinks
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Сок томатный",
                        UrlImg = "/assets/img/jutomato.png",
                        Mass = 1000,
                        Price = 120,
                        Structure = "",
                        DishType = Dish.TypesEnum.Drinks
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Сок яблочный",
                        UrlImg = "/assets/img/juapple.png",
                        Mass = 1000,
                        Price = 120,
                        DishType = Dish.TypesEnum.Drinks
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Сок апельсиновый",
                        UrlImg = "/assets/img/juorange.png",
                        Mass = 1000,
                        Price = 120,
                        Structure = "",
                        DishType = Dish.TypesEnum.Drinks
                    });




                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Чизкейк",
                        UrlImg = "/assets/img/cheesecake.png",
                        Mass = 80,
                        Price = 95,
                        Structure = "Мы перепробовали тысячу десертов и наконец нашли любимца гостей — нежнейший творожный чизкейк",
                        DishType = Dish.TypesEnum.Desserts
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Вишневый пирог",
                        UrlImg = "/assets/img/cheesecake_cherr.jpg",
                        Mass = 80,
                        Price = 95,
                        Structure = "Это не просто десерт, а вишенка на торте! Творожно-песочное тесто с ягодами, заварным кремом и лепестками миндаля",
                        DishType = Dish.TypesEnum.Desserts
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Сырники",
                        UrlImg = "/assets/img/cheesecakes.png",
                        Mass = 90,
                        Price = 140,
                        Structure = "Любимый десерт многих наших гостей — румяные сырники из печи",
                        DishType = Dish.TypesEnum.Desserts
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Шоколадный маффин",
                        UrlImg = "/assets/img/muffin.jpg",
                        Mass = 140,
                        Price = 100,
                        Structure = "Основное блюдо заканчивается, начинаются маффины с начинкой на шоколадной основе",
                        DishType = Dish.TypesEnum.Desserts
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Шоколадное печенье",
                        UrlImg = "/assets/img/cookie.jpg",
                        Mass = 40,
                        Price = 50,
                        Structure = "Сочетает в себе темный и бельгийский молочный шоколад",
                        DishType = Dish.TypesEnum.Desserts
                    }); */

                    /*


                    

                    dbContext.Pizzas.Add(new Pizza
                    {
                        PizzaName = "Гавайская",
                        UrlImg = "/assets/img/hawaiian.jpg",
                        MinPrice = 390,
                        Structure = "Сыр Моцарелла, ветчина, ананасы и фирменный соус",
                        PizzaType = Pizza.TypesPizzaEnum.Usual
                    });

                    dbContext.Pizzas.Add(new Pizza
                    {
                        PizzaName = "Маргарита",
                        UrlImg = "/assets/img/margarita.jpg",
                        MinPrice = 289,
                        Structure = "Сыр Моцарелла, ветчина, ананасы и фирменный соус",
                        PizzaType = Pizza.TypesPizzaEnum.Meatless
                    });
                    
                    dbContext.Pizzas.Add(new Pizza
                    {
                        PizzaName = "Ветчина / грибы",
                        UrlImg = "/assets/img/hunting.jpg",
                        MinPrice = 300,
                        Structure = "Сыр Моцарелла, ветчина, шампиньоны и фирменный соус",
                        PizzaType = Pizza.TypesPizzaEnum.Usual
                    });


                    dbContext.Pizzas.Add(new Pizza
                    {
                        PizzaName = "Греческая",
                        UrlImg = "/assets/img/greek.jpg",
                        MinPrice = 340,
                        Structure = "Сыр Моцарелла, шампиньоны, болгарский перец, помидоры, маслины и фирменный соус",
                        PizzaType = Pizza.TypesPizzaEnum.Usual
                    });

                    dbContext.Pizzas.Add(new Pizza
                    {
                        PizzaName = "4 сыра",
                        UrlImg = "/assets/img/cheese.jpg",
                        MinPrice = 410,
                        Structure = "Сыр Моцарелла, сыр Тильзитер, сыр Пармезан, сыр с голубой плесенью и сливочный соус",
                        PizzaType = Pizza.TypesPizzaEnum.Meatless
                    });

                    dbContext.Pizzas.Add(new Pizza
                    {
                        PizzaName = "Сырная",
                        UrlImg = "/assets/img/onecheese.jpg",
                        MinPrice = 320,
                        Structure = "Сыр Моцарелла, желтый полутвердный сыр Тильзитер, сыр Брынза, фирменный соус и итальянские травы",
                        PizzaType = Pizza.TypesPizzaEnum.Meatless
                    });

                    dbContext.Pizzas.Add(new Pizza
                    {
                        PizzaName = "Цезарь",
                        UrlImg = "/assets/img/caesar.jpg",
                        MinPrice = 379,
                        Structure = "Сыр Моцарелла, нежное куриное филе, сочные томаты и соус Цезарь",
                        PizzaType = Pizza.TypesPizzaEnum.Usual
                    }); 

                    dbContext.Pizzas.Add(new Pizza
                    {
                        PizzaName = "Техас",
                        UrlImg = "/assets/img/texas.jpg",
                        MinPrice = 389,
                        Structure = "Сыр Моцарелла, ароматная ветчина, копченые колбаски, свежие шампиньоны, горчичный соус и итальянские травы",
                        PizzaType = Pizza.TypesPizzaEnum.Usual
                    });

                    dbContext.Pizzas.Add(new Pizza
                    {
                        PizzaName = "Дьябло",
                        UrlImg = "/assets/img/diablo.jpg",
                        MinPrice = 429,
                        Structure = "Сыр Моцарелла, пикантные пепперони, нежное куриное филе, болгарский перец, перец халапеньо и фирменный соус",
                        PizzaType = Pizza.TypesPizzaEnum.Spicy
                    });

                    await dbContext.SaveChangesAsync();


                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Маленькая",
                        Mass = 425,
                        Price = 289,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Маргарита").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Средняя",
                        Mass = 610,
                        Price = 479,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Маргарита").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Большая",
                        Mass = 860,
                        Price = 619,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Маргарита").FirstOrDefault(),
                    });



                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Маленькая",
                        Mass = 410,
                        Price = 300,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Ветчина / грибы").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Средняя",
                        Mass = 570,
                        Price = 460,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Ветчина / грибы").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Большая",
                        Mass = 760,
                        Price = 630,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Ветчина / грибы").FirstOrDefault(),
                    });



                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Маленькая",
                        Mass = 440,
                        Price = 390,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Гавайская").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Средняя",
                        Mass = 690,
                        Price = 580,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Гавайская").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Большая",
                        Mass = 900,
                        Price = 670,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Гавайская").FirstOrDefault(),
                    });



                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Маленькая",
                        Mass = 500,
                        Price = 340,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Греческая").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Средняя",
                        Mass = 610,
                        Price = 580,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Греческая").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Большая",
                        Mass = 1050,
                        Price = 730,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Греческая").FirstOrDefault(),
                    });




                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Маленькая",
                        Mass = 355,
                        Price = 410,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "4 сыра").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Средняя",
                        Mass = 515,
                        Price = 635,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "4 сыра").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Большая",
                        Mass = 710,
                        Price = 779,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "4 сыра").FirstOrDefault(),
                    });



                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Маленькая",
                        Mass = 365,
                        Price = 320,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Сырная").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Средняя",
                        Mass = 660,
                        Price = 520,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Сырная").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Большая",
                        Mass = 770,
                        Price = 670,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Сырная").FirstOrDefault(),
                    });



                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Маленькая",
                        Mass = 435,
                        Price = 379,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Цезарь").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Средняя",
                        Mass = 660,
                        Price = 560,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Цезарь").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Большая",
                        Mass = 950,
                        Price = 740,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Цезарь").FirstOrDefault(),
                    });



                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Маленькая",
                        Mass = 375,
                        Price = 389,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Техас").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Средняя",
                        Mass = 650,
                        Price = 580,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Техас").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Большая",
                        Mass = 910,
                        Price = 740,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Техас").FirstOrDefault(),
                    });




                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Маленькая",
                        Mass = 440,
                        Price = 429,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Дьябло").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Средняя",
                        Mass = 650,
                        Price = 660,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Дьябло").FirstOrDefault(),
                    });
                    dbContext.PizzaSizes.Add(new PizzaSize
                    {
                        NameSize = "Большая",
                        Mass = 960,
                        Price = 809,
                        Pizza = dbContext.Pizzas.Where(p => p.PizzaName == "Дьябло").FirstOrDefault(),
                    });

                    await dbContext.SaveChangesAsync(); */
                }

                return 0;
            };

        }
    }
}
