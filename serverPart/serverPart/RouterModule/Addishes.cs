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
            Get["/dishes/", runAsync: true] = async (x, token) =>
            {
                List<Dish> dishes = new List<Dish>();

                using (var dbContext = new ApplicationContext())
                {
                    dishes = await dbContext.Dishes.ToListAsync();
                }

                var response = new Response();

                response.Headers["Access-Control-Allow-Origin"] = "*";
                response.Headers["Access-Control-Allow-Methods"] = "GET";
                response.Headers["Content-Type"] = "application/json";
                response.Headers["Dishes"] = JsonSerializer.Serialize(dishes);
                response.Headers["Access-Control-Expose-Headers"] = "Dishes";

                return response;
            };

            Get["/dishes/{enumer}", runAsync: true] = async (x, token) =>
            {
                int enumer = x.enumer;
                //Dish.TypesEnum enumer = x.enumer;

                List<Dish> dishes = new List<Dish>();

                using (var dbContext = new ApplicationContext())
                {
                    dishes = await dbContext.Dishes.Where(dish => ((int)dish.DishType) == enumer).ToListAsync();
                }

                var response = new Response();

                response.Headers["Access-Control-Allow-Origin"] = "*";
                response.Headers["Access-Control-Allow-Methods"] = "GET";
                response.Headers["Content-Type"] = "application/json";
                response.Headers["Dishes"] = JsonSerializer.Serialize(dishes);
                response.Headers["Access-Control-Expose-Headers"] = "Dishes";

                return response;
            };
        }
    }
}
