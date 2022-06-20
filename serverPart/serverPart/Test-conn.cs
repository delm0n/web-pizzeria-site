using Nancy;
using Nancy.Extensions;
using Nancy.ModelBinding;
using serverPart.Data;
using serverPart.Data.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Net;
using System.IO;
using System.Net.Mail;
using NPOI.XSSF.UserModel;
using NPOI.SS.UserModel;

namespace serverPart
{
    public class Test_conn : NancyModule
    {
        public Test_conn()
        {
            Get["/email", runAsync: true] = async (x, token) =>
            {
                try
                {
                    // отправитель - устанавливаем адрес и отображаемое в письме имя
                    MailAddress from = new MailAddress("delm0n@mail.ru", "delm0n");

                    // кому отправляем
                    MailAddress to = new MailAddress("delm0n@mail.ru");

                    // создаем объект сообщения
                    MailMessage m = new MailMessage(from, to);

                    // тема письма
                    m.Subject = "три письма";
                    m.IsBodyHtml = true;
                    m.Body = "<h2>hello word</h2>";
                    
                    // письмо представляет код html
                    m.IsBodyHtml = true;

                    // адрес smtp-сервера и порт, с которого будем отправлять письмо
                    SmtpClient smtp = new SmtpClient("smtp.mail.ru", 587);

                    // логин и пароль
                    smtp.Credentials = new NetworkCredential("delm0n@mail.ru", "e0LEpm1e731bLGYjvu3Q");
                    smtp.EnableSsl = true;
                    smtp.Send(m);


                    m.Body = "<table><tr><th>Russia</th><th>Great Br</th><th>Europe</th><th>Foot length, cm</th><tr><td>34,5</td><td>3,5</td><td>36</td><td>23</td></tr></table>";
                    smtp.Send(m);

                    m.Body = "";
                    m.Attachments.Add(new Attachment("C://52c8e8114c11cfa9e6e668ee652dbf2b.pdf"));
                    smtp.Send(m);

                    //Console.Read();
                } catch (Exception ex)
                {

                }
                

                return new Response { StatusCode = Nancy.HttpStatusCode.OK };

            };


            Get["/exelorder", runAsync: true] = async (x, token) =>
            {
                IWorkbook workbook = new XSSFWorkbook();
                ISheet sheet = workbook.CreateSheet("test");

                ICellStyle style = workbook.CreateCellStyle();
                // Устанавливаем стиль ячейки: выравниваем по горизонтали и по центру
                style.Alignment = HorizontalAlignment.Center;
                IFont font = workbook.CreateFont();
                // Устанавливаем жирный шрифт
                font.IsBold = true;
                //font.Boldweight = short.MaxValue;
                // Используйте метод SetFont, чтобы добавить стиль шрифта к стилю ячейки 
                style.SetFont(font);
                sheet.SetColumnWidth(1, 30 * 256);
                sheet.SetColumnWidth(2, 30 * 256);
                sheet.SetColumnWidth(3, 30 * 256);
                sheet.SetColumnWidth(4, 30 * 256);

                IRow row = sheet.CreateRow(0);
                ICell cell = row.CreateCell(0);
                cell.SetCellValue("№ заказа");

                cell = row.CreateCell(1); cell.CellStyle = style;
                cell.SetCellValue("Клиент");

                cell = row.CreateCell(2); cell.CellStyle = style;
                cell.SetCellValue("Оплата");

                cell = row.CreateCell(3); cell.CellStyle = style;
                cell.SetCellValue("Дата заказа");

                cell = row.CreateCell(4); cell.CellStyle = style;
                cell.SetCellValue("Итоговая стоимость");

                List<Order> orders = new List<Order>();
                using (var dbContext = new ApplicationContext())
                {
                    orders = await dbContext.Orders.OrderBy(o => o.OrderId).ToListAsync();


                    for (int i = 0; i < orders.Count; i++)
                    {
                        row = sheet.CreateRow(i+1);


                        cell = row.CreateCell(0);
                        cell.SetCellValue(orders[i].OrderId);

                        cell = row.CreateCell(1);
                        int? client = orders[i].ClientId;
                        Client clientName = await dbContext.Clients.Where(c => c.ClientId == client).FirstOrDefaultAsync();
                        cell.SetCellValue(clientName.FirstName + " (" + clientName.Telephone + ")");

                        cell = row.CreateCell(2);
                        cell.SetCellValue(orders[i].TypeOfPay);

                        cell = row.CreateCell(3);
                        cell.SetCellValue(orders[i].DateOrder);

                        cell = row.CreateCell(4);
                        cell.SetCellValue(orders[i].LastPrice + " руб.");
                    }
                }


                

                using (var fileData = new FileStream("C:/csharpLabs/test.xlsx", FileMode.Create))
                {
                    workbook.Write(fileData);
                }

                return new Response { StatusCode = Nancy.HttpStatusCode.OK };
            };

            Get["/start", runAsync: true] = async (x, token) =>
            {
                using (var dbContext = new ApplicationContext())
                {
                    #region added

                    /*
                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Чиз ролл",
                        UrlImg = "/assets/img/ch_roll.jpg",
                        Mass = 140,
                        Price = 140,
                        Structure = "Сливочный сыр, японский омлет, кунжут, рис и нори",
                        DishType = Dish.TypesEnum.Rolls
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Ролл с лососем",
                        UrlImg = "/assets/img/salm_roll.jpg",
                        Mass = 115,
                        Price = 199,
                        Structure = "Лосось слабосолёный, рис и нори",
                        DishType = Dish.TypesEnum.Rolls
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Чиби",
                        UrlImg = "/assets/img/chib_roll.png",
                        Mass = 170,
                        Price = 199,
                        Structure = "Лосось холодного копчения, икра Масаго, свежий огурец, пекинская капуста, соус Ширрача, рис и нори",
                        DishType = Dish.TypesEnum.Rolls
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Окинава",
                        UrlImg = "/assets/img/oki_roll.jpg",
                        Mass = 220,
                        Price = 199,
                        Structure = "Сливочный сыр, японский омлет, кунжут, рис и нори",
                        DishType = Dish.TypesEnum.Rolls
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Ролл с угрём",
                        UrlImg = "/assets/img/eel_rool.jpg",
                        Mass = 100,
                        Price = 219,
                        Structure = "Копчёный угорь, рис и нори",
                        DishType = Dish.TypesEnum.Rolls
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Сидней",
                        UrlImg = "/assets/img/syd_roll.png",
                        Mass = 220,
                        Price = 199,
                        Structure = "Креветка, сливочный сыр, стружка тунца, рис и нори",
                        DishType = Dish.TypesEnum.Rolls
                    });
                    

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Ойши",
                        UrlImg = "/assets/img/ois_roll.jpg",
                        Mass = 220,
                        Price = 290,
                        Structure = "Кальмар, сливочный сыр, лосось слабосоленый, соус Чили манго, кунжут, рис и нори",
                        DishType = Dish.TypesEnum.Rolls
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Токио",
                        UrlImg = "/assets/img/tok_roll.jpg",
                        Mass = 240,
                        Price = 309,
                        Structure = "Лосось холодного копчения, огурец свежий, сливочный сыр, икра Масаго, соус Токио, рис и нори",
                        DishType = Dish.TypesEnum.Rolls
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Инь-Янь ",
                        UrlImg = "/assets/img/in_roll.png",
                        Mass = 190,
                        Price = 329,
                        Structure = "Лосось слабосолёный, копчёный угорь, свежий огурец, икра Масаго, рис и нори",
                        DishType = Dish.TypesEnum.Rolls
                    });

                    


                    
                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Картофель Айдахо",
                        UrlImg = "/assets/img/potato.jpg",
                        Mass = 100,
                        Price = 115,
                        Structure = "Картофель в кожуре, нарезанный дольками, слегка отваренный и потом запеченный в ароматной смеси из масла, чеснока и трав",
                        DishType = Dish.TypesEnum.Snacks
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Картофель фри",
                        UrlImg = "/assets/img/potato_2.jpg",
                        Mass = 100,
                        Price = 115,
                        Structure = "Порция хрустящих, золотистых, обжаренных в растительном фритюре и слегка посоленных соломок отборного картофеля",
                        DishType = Dish.TypesEnum.Snacks
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Куриные наггетсы",
                        UrlImg = "/assets/img/nuggets.jpg",
                        Mass = 120,
                        Price = 150,
                        Structure = "Филе куриной грудки в хрустящей панировке, обжаренной в масле",
                        DishType = Dish.TypesEnum.Snacks
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Греческий салат",
                        UrlImg = "/assets/img/greek_salad.jpg",
                        Mass = 210,
                        Price = 195,
                        Structure = "Пекинская капуста, сочные томаты, красный лук, свежие огурцы, болгарский перец, сыр Брынза, маслины",
                        DishType = Dish.TypesEnum.Snacks
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Салат цезарь",
                        UrlImg = "/assets/img/caesar_salad.jpg",
                        Mass = 215,
                        Price = 199,
                        Structure = "Пекинская капуста, сочные томаты, грудка куриная копченая, сыр Пармезан, сухарики и соус цезарь",
                        DishType = Dish.TypesEnum.Snacks
                    });

                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Паста Мюнхенская",
                        UrlImg = "/assets/img/pasta_m.jpg",
                        Mass = 290,
                        Price = 249,
                        Structure = "Паста, ароматные мюнхенские колбаски, болгарский перец, моцарелла и фирменный соус",
                        DishType = Dish.TypesEnum.Snacks
                    });


                    dbContext.Dishes.Add(new Dish
                    {
                        Name = "Паста Карбонара",
                        UrlImg = "/assets/img/pasta_k.jpg",
                        Mass = 300,
                        Price = 270,
                        Structure = "Паста, нежная свинина, ароматный бекон, моцарелла, пармезан и сливочный соус",
                        DishType = Dish.TypesEnum.Snacks
                    });

                    
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
                    });

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
                    */


                    /*dbContext.Ingredients.Add(new Ingredient
                    {
                        Name = "Ветчина",
                        Mass = 40,
                        Price = 50,
                        UrlImg = "/assets/img/bacon.png",
                    });
                    dbContext.Ingredients.Add(new Ingredient
                    {
                        Name = "Шампиньоны",
                        Mass = 40,
                        Price = 35,
                        UrlImg = "/assets/img/champig.png"
                    });
                    dbContext.Ingredients.Add(new Ingredient
                    {
                        Name = "Красный лук",
                        Mass = 25,
                        Price = 30,
                        UrlImg = "/assets/img/onion.png"
                    });
                    dbContext.Ingredients.Add(new Ingredient
                    {
                        Name = "Помидоры",
                        Mass = 50,
                        Price = 35,
                        UrlImg = "/assets/img/tomato.png"
                    });
                    dbContext.Ingredients.Add(new Ingredient
                    {
                        Name = "Ананасы",
                        Mass = 50,
                        Price = 35,
                        UrlImg = "/assets/img/pineapples.png"
                    });
                    dbContext.Ingredients.Add(new Ingredient
                    {
                        Name = "Огурчик",
                        Mass = 50,
                        Price = 35,
                        UrlImg = "/assets/img/cucumber.png"
                    });
                    dbContext.Ingredients.Add(new Ingredient
                    {
                        Name = "Чеддер и пармезан",
                        Mass = 50,
                        Price = 40,
                        UrlImg = "/assets/img/cheeses.png"
                    });
                    dbContext.Ingredients.Add(new Ingredient
                    {
                        Name = "Пепперони",
                        Mass = 40,
                        Price = 50,
                        UrlImg = "/assets/img/pepperoni.png"
                    });
                    

                    await dbContext.SaveChangesAsync(); */

                    #endregion
                }

                return 0;
            };


        }
    }
}
