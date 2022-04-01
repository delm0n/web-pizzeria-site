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

namespace serverPart
{
    public class Test_conn : NancyModule
    {
        public Test_conn()
        {


            Get["/test", runAsync: true] = async (x, token) =>
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
        }
    }
}
