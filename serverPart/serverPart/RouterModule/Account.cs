using Nancy;
using serverPart.Data;
using serverPart.Data.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace serverPart.RouterModule
{
    public class Account : NancyModule
    {
        public Account()
        {
            Get["/log-in/{tel}&{passw}", runAsync: true] = async (x, token) =>
            {
                Client client = new Client();

                string tel = x.tel;
                string passw = x.passw;

                using (var dbContext = new ApplicationContext())
                {
                    client = await dbContext.Clients.FirstOrDefaultAsync(c => c.Telephone == tel && c.Password == passw);
                }

                if (client == null)
                {
                    //return new Response { StatusCode = HttpStatusCode.Forbidden};
                    return "Not ok";
                }
                else
                {
                    return Response.AsJson(client);
                }
                
            };

            Post["/regist/{firstn}&{tel}&{passw}", runAsync: true] = async (x, token) =>
            {

                string tel = x.tel;
                string passw = x.passw;
                string firstn = x.firstn;

                Client client = new Client() { Telephone = x.tel, FirstName = x.firstn, Password = x.passw};


                using (var dbContext = new ApplicationContext())
                {
                    if(await dbContext.Clients.Where(c => c.Telephone == tel).FirstOrDefaultAsync() == null)
                    {   //если клиент с таким номером телефона не зарегистрирован
                        dbContext.Clients.Add(client);
                        await dbContext.SaveChangesAsync();
                        return Response.AsJson(client);
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
