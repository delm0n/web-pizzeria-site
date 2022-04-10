using Nancy;
using Nancy.ModelBinding;
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

            Get["/client-re", runAsync: true] = async (x, token) =>
            {
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();
                x = this.Bind<Client>();
                int clientId = x.ClientId;

                if (!string.IsNullOrEmpty(token_headers))
                {
                    using (var dbContext = new ApplicationContext())
                    {

                        Client client = await dbContext.Clients.Where(c => c.ClientId == clientId).FirstOrDefaultAsync();

                        if (client != null)
                        {   //если клиент существует

                            client.FirstName = x.FirstName;
                            client.Password = x.Password;
                            await dbContext.SaveChangesAsync();


                            var response = new Response();

                            response.StatusCode = (Nancy.HttpStatusCode)200;
                            response.Headers["Access-Control-Allow-Origin"] = "*";
                            response.Headers["Access-Control-Allow-Method"] = "GET";

                            response.Headers["Authorization"] = token_headers;
                            response.Headers["Access-Control-Expose-Headers"] = "Authorization, Client"; //для прочтения заголовков клиентом
                            response.Headers["Content-Type"] = "application/json";

                            response.Headers["Client"] = JsonSerializer.Serialize(client); //данные о клиенте

                            return response;
                        }

                        else
                        {
                            //return new Response { StatusCode = HttpStatusCode.Forbidden};
                            return "Not";
                        }
                    }
                }

                else return new Response() { StatusCode = Nancy.HttpStatusCode.NotFound };
            };


            Get["/enter", runAsync: true] = async (x, token) =>
            {

                //var req = Request.Query; //получаю все параметры
                x = this.Bind<Client>(); //Получаю параметры + null в модели
                string token_headers = Request.Headers["Authorization"].FirstOrDefault(); //получаю токен

                Client client = new Client();

                //если токен есть
                if (!string.IsNullOrEmpty(token_headers))
                {
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
                        response.Headers["Access-Control-Allow-Method"] = "GET";


                        response.Headers["Authorization"] = token_headers;
                        response.Headers["Access-Control-Expose-Headers"] = "Authorization, Client"; //для прочтения заголовков клиентом
                        response.Headers["Content-Type"] = "application/json";


                        response.Headers["Client"] = JsonSerializer.Serialize(client); //данные о клиенте

                        return response;
                    }
                }

                else return new Response() { StatusCode = Nancy.HttpStatusCode.NotFound };

            };


            Post["/registration", runAsync: true] = async (x, token) =>
            {
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();


                //если токен есть
                if (!string.IsNullOrEmpty(token_headers))
                {
                    x = this.Bind<Client>();

                    string tel = x.Telephone;
                    string passw = x.Password;
                    string firstn = x.FirstName;

                    using (var dbContext = new ApplicationContext())
                    {
                        if (await dbContext.Clients.Where(c => c.Telephone == tel).FirstOrDefaultAsync() == null)
                        {   //если клиент с таким номером телефона не зарегистрирован

                            Client client = new Client() { Telephone = x.Telephone, FirstName = x.FirstName, 
                                Password = x.Password, PizzaCartJson = "" };
                            dbContext.Clients.Add(client);
                            await dbContext.SaveChangesAsync();

                            var response = new Response();

                            response.StatusCode = (Nancy.HttpStatusCode)200;
                            response.Headers["Access-Control-Allow-Origin"] = "*";
                            response.Headers["Access-Control-Allow-Method"] = "POST";

                            response.Headers["Authorization"] = token_headers;
                            response.Headers["Access-Control-Expose-Headers"] = "Authorization, Client"; //для прочтения заголовков клиентом
                            response.Headers["Content-Type"] = "application/json";

                            response.Headers["Client"] = JsonSerializer.Serialize(client); //данные о клиенте

                            return response;
                        }

                        else
                        {
                            //return new Response { StatusCode = HttpStatusCode.Forbidden};
                            return "Not";
                        }
                    }
                }

                else return new Response() { StatusCode = Nancy.HttpStatusCode.NotFound };
            };

        }
    }
}
