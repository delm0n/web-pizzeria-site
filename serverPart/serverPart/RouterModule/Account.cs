using Nancy;
using Nancy.ModelBinding;
using Newtonsoft.Json;
using serverPart.Data;
using serverPart.Data.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

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

                            client.FirstName = x.FirstName;
                            client.Password = x.Password;
                            await dbContext.SaveChangesAsync();

                            var response = new Response();

                            response.StatusCode = (Nancy.HttpStatusCode)200;
                            response.Headers["Access-Control-Allow-Origin"] = "*";
                            response.Headers["Access-Control-Allow-Method"] = "POST";

                            //response.Headers["Authorization"] = PersonalToken.getToken();
                            response.Headers["Access-Control-Expose-Headers"] = "Client"; //для прочтения заголовков клиентом
                            response.Headers["Content-Type"] = "application/json";

                            response.Headers["Client"] = System.Text.Json.JsonSerializer.Serialize(client); //данные о клиенте

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
                    return new Response() { StatusCode = Nancy.HttpStatusCode.NotFound };
                }
            };


            Post["/enter", runAsync: true] = async (x, token) =>
            {
                //string token_headers = Request.Headers["Authorization"].FirstOrDefault(); //получаю токен
                //var req = Request.Query; //получаю все параметры

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

                    //Для запросов с «непростым» методом или особыми заголовками браузер делает предзапрос OPTIONS
                    //response.Headers["Access-Control-Request-Method"] = "GET";
                    //response.Headers["Access-Control-Request-Headers"] = "Authorization";

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


                //else return new Response() { StatusCode = Nancy.HttpStatusCode.NotFound };

            };


            Post["/registr", runAsync: true] = async (x, token) =>
            {

                x = this.Bind<Client>();

                string tel = x.Telephone;
                //string passw = x.Password;
                //string firstn = x.FirstName;

                Client client = new Client();

                using (var dbContext = new ApplicationContext())
                {
                    if (await dbContext.Clients.Where(c => c.Telephone == tel).FirstOrDefaultAsync() != null)
                    {
                        return "Not";
                    }

                    else
                    {  //если клиент с таким номером телефона не зарегистрирован

                        client.Telephone = x.Telephone;
                        client.FirstName = x.FirstName;
                        client.Password = x.Password;


                        dbContext.Clients.Add(client);
                        await dbContext.SaveChangesAsync();

                        Cart cart = new Cart() { Client = await dbContext.Clients.Where(c => c.Telephone == tel).FirstOrDefaultAsync() };
                        dbContext.Carts.Add(cart);
                        await dbContext.SaveChangesAsync();
                        client.Cart = null;
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
        }
    }
}
