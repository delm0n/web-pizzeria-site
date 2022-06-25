using Nancy;
using Nancy.ModelBinding;
using Newtonsoft.Json;
using serverPart.Data;
using serverPart.Data.Entity;
using serverPart.Data.Helper;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace serverPart.RouterModule
{
    public class Account : NancyModule
    {
        public Account()
        {

            Post["/client-re", runAsync: true] = async (x, token) =>
            {
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    x = this.Bind<Client>();
                    int clientId = x.ClientId;

                    using (var dbContext = new ApplicationContext())
                    {
                        Client client = await dbContext.Clients.Where(c => c.ClientId == clientId).FirstOrDefaultAsync();
                        if (client != null)
                        {
                            //если клиент существует
                            client.FirstName = x.FirstName; client.Password = x.Password;
                            await dbContext.SaveChangesAsync();

                            var response = new Response();
                            response.StatusCode = (Nancy.HttpStatusCode)200;
                            response.Headers["Access-Control-Allow-Origin"] = "*";
                            response.Headers["Access-Control-Allow-Method"] = "POST";
                            response.Headers["Access-Control-Expose-Headers"] = "Client"; 
                            response.Headers["Content-Type"] = "application/json";
                            response.Headers["Client"] = System.Text.Json.JsonSerializer.Serialize(client); 
                            return response;
                        }
                        else
                        {
                            return new Response() { StatusCode = Nancy.HttpStatusCode.NotFound };
                        }
                    }
                }
                else
                {
                    return new Response() { StatusCode = Nancy.HttpStatusCode.Unauthorized };
                }
            };


            Post["/enter", runAsync: true] = async (x, token) =>
            {
                x = this.Bind<Client>(); //Получаю параметры + null в модели
                Client client = new Client();
                string tel = x.Telephone; string passw = x.Password;

                using (var dbContext = new ApplicationContext())
                {
                    client = await dbContext.Clients.FirstOrDefaultAsync(c => c.Telephone == tel && c.Password == passw);
                }

                if (client == null) //если клиент не зарегистрирован
                    return "Not";

                else
                {
                    var response = new Response();
                    response.StatusCode = (Nancy.HttpStatusCode)200;
                    response.Headers["Access-Control-Allow-Origin"] = "*";
                    response.Headers["Access-Control-Allow-Method"] = "POST";
                    PersonalToken.setToken(tel + ":" + Convert.ToBase64String(Guid.NewGuid().ToByteArray()));
                    response.Headers["Token"] = PersonalToken.getToken();
                    response.Headers["Access-Control-Expose-Headers"] = "Token, Client"; //для прочтения заголовков клиентом
                    response.Headers["Content-Type"] = "application/json";
                    response.Headers["Client"] = System.Text.Json.JsonSerializer.Serialize(client); //данные о клиенте

                    return response;
                }
            };


            Post["/registr", runAsync: true] = async (x, token) =>
            {
                x = this.Bind<Client>();
                Client client = new Client(); string tel = x.Telephone; string email = x.Email;

                using (var dbContext = new ApplicationContext())
                {
                    if (await dbContext.Clients.Where(c => c.Telephone == tel).FirstOrDefaultAsync() != null)
                        return "Tel";
                    
                    //if (await dbContext.Clients.Where(c => c.Email == email).FirstOrDefaultAsync() != null)
                    //    return "Em";

                    else
                    {  //если клиент с таким номером телефона и почтой не зарегистрирован

                        client.Telephone = x.Telephone; client.FirstName = x.FirstName;
                        client.Password = x.Password; client.Email = x.Email;
                        dbContext.Clients.Add(client); await dbContext.SaveChangesAsync();

                        client = await dbContext.Clients.Where(c => c.Telephone == tel).FirstOrDefaultAsync();
                        Cart cart = new Cart() { ClientId = client.ClientId };
                        dbContext.Carts.Add(cart);
                        await dbContext.SaveChangesAsync();
                        
                    }
                }

                var response = new Response();

                response.StatusCode = (Nancy.HttpStatusCode)200;
                response.Headers["Access-Control-Allow-Origin"] = "*";
                response.Headers["Access-Control-Allow-Method"] = "POST";
                response.Headers["Client"] = System.Text.Json.JsonSerializer.Serialize(client);
                PersonalToken.setToken(tel + ":" + Convert.ToBase64String(Guid.NewGuid().ToByteArray()));
                response.Headers["Token"] = PersonalToken.getToken();
                response.Headers["Access-Control-Expose-Headers"] = "Token, Client"; //для прочтения заголовков клиентом
                response.Headers["Content-Type"] = "application/json";

                return response;
            };


            Post["/send-order", runAsync: true] = async (x, token) =>
            {
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    Order order = this.Bind<Order>();
                    int? id_client = order.ClientId;

                    using (var dbContext = new ApplicationContext())
                    {
                        //очистим корзину
                        Cart cart = await dbContext.Carts.Where(c => c.ClientId == id_client).FirstOrDefaultAsync();
                        cart.PizzaIdJson = ""; cart.PizzaSizeIdJson = ""; 
                        cart.PizzaIngredientIdJson = ""; cart.PizzaCount = ""; 
                        cart.DishIdJson = ""; cart.DishCount = "";

                        dbContext.Orders.Add(order);
                        await dbContext.SaveChangesAsync();

                        List<int> idPizzas = new List<int>(); List<int> countPizzas = new List<int>();
                        if (JsonConvert.DeserializeObject<List<int>>(order.PizzaIdJson) != null)
                        {
                            idPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(order.PizzaIdJson));
                            countPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(order.PizzaCount));
                        }

                        for (int i = 0; i < idPizzas.Count; i++)
                        {
                            int idPizza_dynamic = idPizzas[i];
                            Pizza pizza = await dbContext.Pizzas.FirstOrDefaultAsync(p => p.PizzaId == idPizza_dynamic);
                            pizza.СountOrder = pizza.СountOrder + countPizzas[i];

                            Client client = await dbContext.Clients.Where(c => c.ClientId == id_client).FirstOrDefaultAsync();
                            List<int> idPizzasClient = new List<int>(); //List<int> ratePizzasClient = new List<int>();
                            if (JsonConvert.DeserializeObject<List<int>>(client.PizzaOrderJson) != null)
                            {
                                idPizzasClient.AddRange(JsonConvert.DeserializeObject<List<int>>(client.PizzaOrderJson));
                            }

                            //проверить, есть ли в списке заказанных такая пицца
                            bool nocontain = true;
                            for (int j = 0; j < idPizzasClient.Count; j++)
                            {
                                if (idPizzasClient[j] == idPizza_dynamic)
                                {
                                    nocontain = false;
                                    break;
                                }
                            }

                            if (nocontain)
                                idPizzasClient.Add(idPizza_dynamic);

                            client.PizzaOrderJson = JsonConvert.SerializeObject(idPizzasClient);
                            await dbContext.SaveChangesAsync();

                        }
                        return new Response { StatusCode = Nancy.HttpStatusCode.OK};
                    }
                }
                else
                { return new Response() { StatusCode = Nancy.HttpStatusCode.Unauthorized }; }
            };


            Get["/get-orders/{id_client}", runAsync: true] = async (x, token) =>
            {
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    int clientId = x.id_client;

                    using (var dbContext = new ApplicationContext())
                    {
                        List<Order> order = await dbContext.Orders.Where(o => o.ClientId == clientId).ToListAsync();

                        var response = new Response();

                        response.StatusCode = (Nancy.HttpStatusCode)200;
                        response.Headers["Access-Control-Allow-Origin"] = "*";
                        response.Headers["Access-Control-Allow-Method"] = "GET";
                        response.Headers["Access-Control-Expose-Headers"] = "Order"; 
                        response.Headers["Content-Type"] = "application/json";
                        response.Headers["Order"] = System.Text.Json.JsonSerializer.Serialize(order); 

                        return response;
                    }
                }
                else
                {
                    return new Response() { StatusCode = Nancy.HttpStatusCode.Unauthorized };
                }

            };


            Get["/send-report-to-email/{id_client}&&{id_order}", runAsync: true] = async (x, token) =>
            {
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {

                    int clientId = x.id_client;
                    int orderId = x.id_order;

                    using (var dbContext = new ApplicationContext())
                    {

                        Order order = await dbContext.Orders.Where(o => o.OrderId == orderId).FirstOrDefaultAsync();
                        Client client = await dbContext.Clients.Where(c => c.ClientId == clientId).FirstOrDefaultAsync();

                        List<int> idDishes = new List<int>(); List<int> countDishes = new List<int>();
                        if (JsonConvert.DeserializeObject<List<int>>(order.DishIdJson) != null)
                        {
                            countDishes.AddRange(JsonConvert.DeserializeObject<List<int>>(order.DishCount));
                            idDishes.AddRange(JsonConvert.DeserializeObject<List<int>>(order.DishIdJson));
                        }

                        List<int> idPizzas = new List<int>(); List<int> idSizePizzas = new List<int>(); List<int> countPizzas = new List<int>();
                        List<List<int>> ingredients_array = new List<List<int>>();
                        if (JsonConvert.DeserializeObject<List<int>>(order.PizzaIdJson) != null)
                        {
                            ingredients_array.AddRange(JsonConvert.DeserializeObject<List<List<int>>>(order.PizzaIngredientIdJson));
                            idPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(order.PizzaIdJson));
                            idSizePizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(order.PizzaSizeIdJson));
                            countPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(order.PizzaCount));
                        }

                        try
                        {
                            MailAddress from = new MailAddress("delm0n@mail.ru", "Pizzeria");
                            MailAddress to = new MailAddress(client.Email);
                            MailMessage m = new MailMessage(from, to);

                            // тема письма
                            m.Subject = "Отчёт о покупке №" + orderId;
                            m.IsBodyHtml = true;
                            m.Body = "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin: 0; padding: 0\">" +

                            "<tr><td style=\"padding: 10px; \"></td><td style=\"padding: 10px; \"><a href=\"http://localhost:4200\" style=\"color: #00dab6; line-height: 30px; -webkit-text-size-adjust:none; display: block;\" target=\"_blank\">Закажите пиццу на нашем сайте</a><td></tr>";

                            for (int i = 0; i < idPizzas.Count; i++)
                            {
                                int idPizza_dynamic = idPizzas[i];
                                Pizza pizza = await dbContext.Pizzas.FirstOrDefaultAsync(p => p.PizzaId == idPizza_dynamic);

                                int idPizzaSize_dynamic = idSizePizzas[i];
                                PizzaSize pizzaSize = await dbContext.PizzaSizes.FirstOrDefaultAsync(s => s.PizzaSizeId == idPizzaSize_dynamic);

                                m.Body += "<tr>";
                                m.Body += "<td style=\"padding: 10px; \"><i><b>" + pizza.PizzaName + "</b> - " + pizzaSize.NameSize + "</i></td>";
                                //m.Body += "<td style=\"padding: 10px; \"><i>" + pizzaSize.NameSize + "</i></td>";
                                m.Body += "<td style=\"padding: 10px; \"><i>" + pizzaSize.Price * countPizzas[i] + " рублей" + "</i></td>";
                                m.Body += "<td style=\"padding: 10px; \"><i>" + countPizzas[i] + " шт." + "</i></td>";
                                m.Body += "</tr>";


                                for (int j = 0; j < ingredients_array[i].Count; j++)
                                {
                                    int idIngr_dynamic = ingredients_array[i][j];
                                    Ingredient ingredient = await dbContext.Ingredients.FirstOrDefaultAsync(ing => ing.IngredientId == idIngr_dynamic);

                                    //m.Body += "<tr><td style=\"padding: 10px; \"></td>";
                                    m.Body += "<td style=\"padding: 10px; \"><i>" + ingredient.Name + "</i></td>";
                                    m.Body += "<td style=\"padding: 10px; \"><i>" + ingredient.Price + " рублей" + "</i></td>";
                                    m.Body += "</tr>";
                                }

                            }

                            for (int i = 0; i < idDishes.Count; i++)
                            {
                                int idDish_dynamic = idDishes[i];
                                Dish dish = await dbContext.Dishes.FirstOrDefaultAsync(d => d.DishId == idDish_dynamic);

                                m.Body += "<tr>";
                                m.Body += "<td style=\"padding: 10px; \"><b><i>" + dish.Name + "</i></b></td>";
                                //m.Body += "<td style=\"padding: 10px; \"><i>" + dish.Price + "</i></td>";
                                m.Body += "<td style=\"padding: 10px; \"><i>" + dish.Price * countDishes[i] + " ₽" + "</i></td>";
                                m.Body += "<td style=\"padding: 10px; \"><i>" + countDishes[i] + " шт." + "</i></td>";
                                m.Body += "</tr>";

                            }
                            
                            m.Body += "<tr><td style=\"padding: 10px; \">Тип оплаты: " + order.TypeOfPay + "</td></tr>";
                            m.Body += "<tr><td style=\"padding: 10px; \">Дата: " + order.DateOrder + "</td></tr>";
                            m.Body += "<tr><td style=\"padding: 10px; \"><b>Итоговая сумма заказа: " + order.LastPrice + " ₽</b></td></tr>";

                            m.Body += "</table>";

                            SmtpClient smtp = new SmtpClient("smtp.mail.ru", 587);

                            smtp.Credentials = new NetworkCredential("delm0n@mail.ru", "e0LEpm1e731bLGYjvu3Q");
                            smtp.EnableSsl = true;
                            smtp.Send(m);

                        }
                        catch (Exception ex)
                        {
                            return new Response { StatusCode = Nancy.HttpStatusCode.ServiceUnavailable };
                        }

                        return new Response { StatusCode = Nancy.HttpStatusCode.OK};
                    }

                }
                else
                {
                    return new Response() { StatusCode = Nancy.HttpStatusCode.Unauthorized };
                }


            };


            Post["/send-report-to-email-between", runAsync: true] = async (x, token) =>
            {
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    EmailBetween emailBetween = this.Bind<EmailBetween>();

                    int clientId = emailBetween.ClientID;
                    DateTime bfre = emailBetween.DataBefore;
                    DateTime aftr = emailBetween.DataAfter;

                    using (var dbContext = new ApplicationContext())
                    {

                        List<Order> orders = await dbContext.Orders.Where(o => o.ClientId == clientId).ToListAsync();

                        Client client = await dbContext.Clients.Where(c => c.ClientId == clientId).FirstOrDefaultAsync();

                        try
                        {

                            MailAddress from = new MailAddress("delm0n@mail.ru", "Pizzeria");
                            MailAddress to = new MailAddress(client.Email);
                            MailMessage m = new MailMessage(from, to);

                            // тема письма
                            m.Subject = "Отчёт о покупках c " + emailBetween.DataBefore.ToString("dd/MM/yyyy")
                            + " по " + emailBetween.DataAfter.ToString("dd/MM/yyyy");
                            m.IsBodyHtml = true;
                            m.Body = "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin: 0; padding: 0\">" +

                            "<tr><td style=\"padding: 10px; \"></td><td style=\"padding: 10px; \"><a href=\"http://localhost:4200\" style=\"color: #00dab6; line-height: 30px; -webkit-text-size-adjust:none; display: block;\" target=\"_blank\">Закажите пиццу на нашем сайте</a><td></tr>";


                            foreach (Order order in orders)
                            {
                                if (DateTime.Parse(order.DateOrder) >= bfre && DateTime.Parse(order.DateOrder) <= aftr)
                                {

                                    List<int> idDishes = new List<int>(); List<int> countDishes = new List<int>();
                                    if (JsonConvert.DeserializeObject<List<int>>(order.DishIdJson) != null)
                                    {
                                        countDishes.AddRange(JsonConvert.DeserializeObject<List<int>>(order.DishCount));
                                        idDishes.AddRange(JsonConvert.DeserializeObject<List<int>>(order.DishIdJson));
                                    }


                                    List<int> idPizzas = new List<int>(); List<int> idSizePizzas = new List<int>();
                                    List<int> countPizzas = new List<int>(); List<List<int>> ingredients_array = new List<List<int>>();
                                    if (JsonConvert.DeserializeObject<List<int>>(order.PizzaIdJson) != null)
                                    {
                                        ingredients_array.AddRange(JsonConvert.DeserializeObject<List<List<int>>>(order.PizzaIngredientIdJson));
                                        idPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(order.PizzaIdJson));
                                        idSizePizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(order.PizzaSizeIdJson));
                                        countPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(order.PizzaCount));
                                    }

                                    m.Body += "<tr><td style=\"padding: 10px; \"></td></tr>";
                                    m.Body += "<tr><td style=\"padding: 10px; \"></td><td style=\"padding: 10px; \"><b>Заказ №" + order.OrderId
                                    + "</b></td><td style=\"padding: 10px; \"></td></tr>";

                                    for (int i = 0; i < idPizzas.Count; i++)
                                    {
                                        int idPizza_dynamic = idPizzas[i];
                                        Pizza pizza = await dbContext.Pizzas.FirstOrDefaultAsync(p => p.PizzaId == idPizza_dynamic);

                                        int idPizzaSize_dynamic = idSizePizzas[i];
                                        PizzaSize pizzaSize = await dbContext.PizzaSizes
                                        .FirstOrDefaultAsync(s => s.PizzaSizeId == idPizzaSize_dynamic);

                                        m.Body += "<tr>";
                                        m.Body += "<td style=\"padding: 10px; \"><i><b>" + pizza.PizzaName + "</b> - " + pizzaSize.NameSize + "</i></td>";
                                        //m.Body += "<td style=\"padding: 10px; \"><i>" + pizzaSize.NameSize + "</i></td>";
                                        m.Body += "<td style=\"padding: 10px; \"><i>" + pizzaSize.Price * countPizzas[i] + " рублей" + "</i></td>";
                                        m.Body += "<td style=\"padding: 10px; \"><i>" + countPizzas[i] + " шт." + "</i></td>";
                                        m.Body += "</tr>";


                                        for (int j = 0; j < ingredients_array[i].Count; j++)
                                        {
                                            int idIngr_dynamic = ingredients_array[i][j];
                                            Ingredient ingredient = await dbContext.Ingredients
                                            .FirstOrDefaultAsync(ing => ing.IngredientId == idIngr_dynamic);

                                            //m.Body += "<tr><td style=\"padding: 10px; \"></td>";
                                            m.Body += "<td style=\"padding: 10px; \"><i>" + ingredient.Name + "</i></td>";
                                            m.Body += "<td style=\"padding: 10px; \"><i>" + ingredient.Price + " рублей" + "</i></td>";
                                            m.Body += "</tr>";
                                        }

                                    }

                                    for (int i = 0; i < idDishes.Count; i++)
                                    {
                                        int idDish_dynamic = idDishes[i];
                                        Dish dish = await dbContext.Dishes.FirstOrDefaultAsync(d => d.DishId == idDish_dynamic);

                                        m.Body += "<tr>";
                                        m.Body += "<td style=\"padding: 10px; \"><b><i>" + dish.Name + "</i></b></td>";
                                        //m.Body += "<td style=\"padding: 10px; \"><i>" + dish.Price + "</i></td>";
                                        m.Body += "<td style=\"padding: 10px; \"><i>" + dish.Price * countDishes[i] + " ₽" + "</i></td>";
                                        m.Body += "<td style=\"padding: 10px; \"><i>" + countDishes[i] + " шт." + "</i></td>";
                                        m.Body += "</tr>";

                                    }

                                    m.Body += "<tr><td style=\"padding: 10px; \">Тип оплаты: " + order.TypeOfPay + "</td></tr>";
                                    m.Body += "<tr><td style=\"padding: 10px; \">Дата: " + order.DateOrder + "</td></tr>";
                                    m.Body += "<tr><td style=\"padding: 10px; \"><b>Итоговая сумма заказа: " + order.LastPrice + " ₽</b></td></tr>";

                                }
                            }

                            m.Body += "</table>";

                            SmtpClient smtp = new SmtpClient("smtp.mail.ru", 587);

                            smtp.Credentials = new NetworkCredential("delm0n@mail.ru", "e0LEpm1e731bLGYjvu3Q");
                            smtp.EnableSsl = true;
                            smtp.Send(m);
                        }
                        catch (Exception ex)
                        {
                            return new Response { StatusCode = Nancy.HttpStatusCode.ServiceUnavailable };
                        }

                        return new Response { StatusCode = Nancy.HttpStatusCode.OK };
                    }

                }
                else
                {
                    return new Response() { StatusCode = Nancy.HttpStatusCode.Unauthorized };
                }
            };
            
        }
    }
}
