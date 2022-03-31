using Nancy;
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
            Get["/log-in/{tel}&{passw}", runAsync: true] = async (x, token) =>
            {
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                Client client = new Client();

                if (!string.IsNullOrEmpty(token_headers))
                {
                    string tel = x.tel;
                    string passw = x.passw;

                    using (var dbContext = new ApplicationContext())
                    {
                        client = await dbContext.Clients.FirstOrDefaultAsync(c => c.Telephone == tel && c.Password == passw);
                    }

                }

                if (client == null)
                {
                    //return new Response { StatusCode = HttpStatusCode.InternalServerError};
                    return "Not ok";
                }
                else
                {
                    var response = new Response();
                    response.Headers["Authorization"] = token_headers;
                    response.Headers["data"] = JsonSerializer.Serialize(client);

                    //var header = new Dictionary<string, string>() { { "Authorization", token_headers }, { "data", JsonSerializer.Serialize(client) } };
                    //var content = JsonSerializer.Serialize(client);
                    //WebResponse response = request.GetResponse();
                    
                    return response;
                }

            };

            Get["/regist/{firstn}&{tel}&{passw}", runAsync: true] = async (x, token) =>
            {
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                string tel = x.tel;
                string passw = x.passw;
                string firstn = x.firstn;

                using (var dbContext = new ApplicationContext())
                {
                    if (await dbContext.Clients.Where(c => c.Telephone == tel).FirstOrDefaultAsync() == null && !string.IsNullOrEmpty(token_headers))
                    {   //если клиент с таким номером телефона не зарегистрирован

                        Client client = new Client() { Telephone = x.tel, FirstName = x.firstn, Password = x.passw, PizzaCartJson="" };
                        dbContext.Clients.Add(client);
                        await dbContext.SaveChangesAsync();

                        //return Response.AsJson(client);

                        var response = new Response();
                        response.Headers["Authorization"] = token_headers;
                        response.Headers["data"] = JsonSerializer.Serialize(client);
                        return response;
                    }

                    else
                    {
                        //return new Response { StatusCode = HttpStatusCode.Forbidden};
                        return "Not ok";
                    }
                }
            };

            Get["/client-rename/{id}&{firstn}", runAsync: true] = async (x, token) =>
            {
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();
                int clientId = x.id;

                using (var dbContext = new ApplicationContext())
                {
                    
                    Client client = await dbContext.Clients.Where(c => c.ClientId == clientId).FirstOrDefaultAsync();

                    if (client != null && !string.IsNullOrEmpty(token_headers))
                    {   //если клиент существует
                        
                        client.FirstName = x.firstn;
                        await dbContext.SaveChangesAsync();

                        //возвращаем обновлённого клиента
                        //return Response.AsJson(client);

                        var response = new Response();
                        response.Headers["Authorization"] = token_headers;
                        response.Headers["data"] = JsonSerializer.Serialize(client);
                        return response;
                    }

                    else
                    {
                        //return new Response { StatusCode = HttpStatusCode.Forbidden};
                        return "Not ok";
                    }
                }
            };


            Get["/client-repassword/{id}&{passw}", runAsync: true] = async (x, token) =>
            {
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();
                int clientId = x.id;

                using (var dbContext = new ApplicationContext())
                {

                    Client client = await dbContext.Clients.Where(c => c.ClientId == clientId).FirstOrDefaultAsync();

                    if (client != null && !string.IsNullOrEmpty(token_headers))
                    {   //если клиент существует

                        client.Password = x.passw;
                        await dbContext.SaveChangesAsync();

                        //возвращаем обновлённого клиента
                        //return Response.AsJson(client);

                        var response = new Response();
                        response.Headers["Authorization"] = token_headers;
                        response.Headers["data"] = JsonSerializer.Serialize(client);
                        return response;
                    }

                    else
                    {
                        //return new Response { StatusCode = HttpStatusCode.Forbidden};
                        return "Not ok";
                    }
                }
            };


        }
    }
}
