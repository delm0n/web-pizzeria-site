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
    public class CartService : NancyModule
    {
        public CartService()
        {
            Put["/add-pizza-in-cart/{id}&&{pizza_array}", runAsync: true] = async (x, token) =>
            {

                int clientId = x.id;

                using (var dbContext = new ApplicationContext())
                {

                    Client client = await dbContext.Clients.Where(c => c.ClientId == clientId).FirstOrDefaultAsync();

                    if (client != null)
                    {   //если клиент существует

                        client.PizzaCartJson = x.pizza_array;
                        await dbContext.SaveChangesAsync();

                        //возвращаем обновлённого клиента
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
