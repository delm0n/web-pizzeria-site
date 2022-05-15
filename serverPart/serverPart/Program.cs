using Nancy.Hosting.Self;
using serverPart.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebSocketSharp.Server;
using WebSocketSharp;
using serverPart.Data.Entity;
using serverPart.Data.Helper;
using System.Data.Entity;
using Newtonsoft.Json;

namespace serverPart
{
    public class PizzaRating : WebSocketBehavior
    {
        
        protected override void OnClose(CloseEventArgs e)
        {
            Console.WriteLine("Соединение закрыто");
        }

        protected override void OnOpen()
        {
            if (Context.RequestUri.Query.ToString().Remove(0, 1) == PersonalToken.getToken())
            {
                using (ApplicationContext db = new ApplicationContext())
                {
                    Send(System.Text.Json.JsonSerializer.Serialize(db.Pizzas.OrderBy(p => p.PizzaId).ToList()));
                }

                Console.WriteLine("Соединение установлено, отправлены данные с БД и получен токен");
            }

            else
            {
                Sessions.CloseSession(ID);
                Console.WriteLine("Токен не прошёл проверку");
            }

        }

        protected override async void OnMessage(MessageEventArgs e)
        {
            PizzaRate pizzaRate = System.Text.Json.JsonSerializer.Deserialize<PizzaRate>(e.Data);

            using (ApplicationContext db = new ApplicationContext())
            {
                Pizza pizza = await db.Pizzas.Where(p => p.PizzaId == pizzaRate.PizzaId).FirstOrDefaultAsync();

                if (pizza != null)
                {
                    List<int> IdsClientRate = new List<int>(); List<int> ClientRates = new List<int>();

                    if (JsonConvert.DeserializeObject<List<int>>(pizza.IdClientRateJson) != null)
                    {
                        IdsClientRate.AddRange(JsonConvert.DeserializeObject<List<int>>(pizza.IdClientRateJson));
                        ClientRates.AddRange(JsonConvert.DeserializeObject<List<int>>(pizza.ClientRateJson));
                    }

                    bool client_notrated = true;
                    for (int i = 0; i < IdsClientRate.Count; i++)
                    {
                        if(pizzaRate.ClientId == IdsClientRate[i])
                        {
                            //такой клиент уж оценивал эту пиццу
                            ClientRates[i] = pizzaRate.Rating;
                            client_notrated = false;
                            break;
                        }
                    }

                    //если не оценивал, то добавляем
                    if (client_notrated)
                    {
                        IdsClientRate.Add(pizzaRate.ClientId);
                        ClientRates.Add(pizzaRate.Rating);
                    }


                    double summary_rating = 5; //изначально 5 от пиццерии
                    //пересчёт рейтинга - среднее арифметическое
                    for (int i = 0; i < IdsClientRate.Count; i++)
                        summary_rating += ClientRates[i];
                     

                    //pizza.Rating =  summary_rating / (IdsClientRate.Count + 1);
                    pizza.Rating = Math.Round( (summary_rating / (IdsClientRate.Count + 1)), 2);// изначально 5 от пиццерии ( + 1 )
                    pizza.IdClientRateJson = JsonConvert.SerializeObject(IdsClientRate);
                    pizza.ClientRateJson = JsonConvert.SerializeObject(ClientRates);
                    await db.SaveChangesAsync();

                }

                Send(System.Text.Json.JsonSerializer.Serialize(db.Pizzas.OrderBy(p => p.PizzaId).ToList()));
            }
            Console.WriteLine("передано значение " + e.Data);
        }
    }


    internal class Program
    {
        static void Main(string[] args)
        {
            var uri = new Uri("http://localhost:1234");

            HostConfiguration hostConfiguration = new HostConfiguration();
            hostConfiguration.UrlReservations.CreateAutomatically = true;

            WebSocketServer wss = new WebSocketServer("ws://127.0.0.1:7890");


            wss.AddWebSocketService<PizzaRating>("/PizzaRatingWebsocket");     

            using (var host = new NancyHost(hostConfiguration, uri))
            {
                host.Start();wss.Start();

                Console.WriteLine("Your application is running on " + uri + " and ws://127.0.0.1:7890");

                Console.WriteLine("Press any [Enter] to close the host.");
                Console.ReadLine();
                host.Stop();wss.Stop();
            }
        }
    }
}
