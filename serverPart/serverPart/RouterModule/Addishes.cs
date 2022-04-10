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
    public class Addishes : NancyModule
    {
        public Addishes()
        {
            Get["/desserts", runAsync: true] = async (x, token) =>
            {
                List<Dessert> desserts = new List<Dessert>();

                using (var dbContext = new ApplicationContext())
                {
                    desserts = await dbContext.Desserts.ToListAsync();
                }

                var response = new Response();

                response.Headers["Access-Control-Allow-Origin"] = "*";
                response.Headers["Access-Control-Allow-Methods"] = "GET";
                response.Headers["Content-Type"] = "application/json";
                response.Headers["Desserts"] = JsonSerializer.Serialize(desserts);
                response.Headers["Access-Control-Expose-Headers"] = "Desserts";

                return response;
            };
        }
    }
}
