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
    public class PizzaService : NancyModule
    {
        public PizzaService()
        {
            Get["/pizza", runAsync: true] = async (x, token) =>
            {
                List<Pizza> pizzas = new List<Pizza>();

                using (var dbContext = new ApplicationContext())
                {
                    pizzas = await dbContext.Pizzas.OrderBy(p => p.MinPrice).ToListAsync();
                }

                var response = new Response();

                response.Headers["Access-Control-Allow-Origin"] = "*";
                response.Headers["Access-Control-Allow-Methods"] = "GET";
                response.Headers["Content-Type"] = "application/json";
                response.Headers["Pizzas"] = JsonSerializer.Serialize(pizzas);
                response.Headers["Access-Control-Expose-Headers"] = "Pizzas";

                return response;
            };


            Get["/sizeofasync/{id}", runAsync: true] = async (x, token) =>
            {
                List<PizzaSize> pizzaSize = new List<PizzaSize>();
                int param = x.id;
                using (var dbContext = new ApplicationContext())
                {
                    pizzaSize = await dbContext.PizzaSizes.Where(p => p.PizzaId == param).ToListAsync();
                }

                var response = new Response();

                response.Headers["Access-Control-Allow-Origin"] = "*";
                response.Headers["Access-Control-Allow-Methods"] = "GET";
                response.Headers["Content-Type"] = "application/json";
                response.Headers["Pizza"] = JsonSerializer.Serialize(pizzaSize);
                response.Headers["Access-Control-Expose-Headers"] = "Pizza";

                return response;
            };


            Get["/ingredients", runAsync: true] = async (x, token) =>
            {
                List<Ingredient> ingredients = new List<Ingredient>();

                using (var dbContext = new ApplicationContext())
                {
                    ingredients = await dbContext.Ingredients.ToListAsync();
                }

                var response = new Response();
                response.Headers["Access-Control-Allow-Origin"] = "*";
                response.Headers["Access-Control-Allow-Methods"] = "GET";
                response.Headers["Content-Type"] = "application/json";
                response.Headers["Ingredients"] = JsonSerializer.Serialize(ingredients);
                response.Headers["Access-Control-Expose-Headers"] = "Ingredients";

                return response;
            };


            Get["/filter/{pizza_type}&&{pizza_sorted}", runAsync: true] = async (x, token) =>
            {
                int pizza_type = x.pizza_type;
                int pizza_sorted = x.pizza_sorted;

                List<Pizza> pizzas = new List<Pizza>();

                using (var dbContext = new ApplicationContext())
                {
                    
                    if (pizza_sorted != 0)
                    {
                        if (pizza_type != 0) //острая или без мяса
                        {
                            //по рейтингу - 1
                            if (pizza_sorted == 1)
                                pizzas = await dbContext.Pizzas.Where(p => p.PizzaType == (Pizza.TypesPizzaEnum)pizza_type).OrderByDescending(p => p.Rating).ToListAsync();

                            //по популярности - 2
                            else pizzas = await dbContext.Pizzas.Where(p => p.PizzaType == (Pizza.TypesPizzaEnum)pizza_type).OrderByDescending(p => p.СountOrder).ToListAsync();
                        }
                        else //если все, то без where
                        {
                            //по рейтингу - 1
                            if (pizza_sorted == 1)
                                pizzas = await dbContext.Pizzas.OrderByDescending(p => p.Rating).ToListAsync();

                            //по популярности - 2
                            else pizzas = await dbContext.Pizzas.OrderByDescending(p => p.СountOrder).ToListAsync();
                        }

                    }
                    else { 
                        if (pizza_type != 0)
                            pizzas = await dbContext.Pizzas.Where(p => p.PizzaType == (Pizza.TypesPizzaEnum)pizza_type).OrderBy(p => p.MinPrice).ToListAsync();

                        else pizzas = await dbContext.Pizzas.OrderBy(p => p.MinPrice).ToListAsync();
                    }
                }

                var response = new Response();

                response.Headers["Access-Control-Allow-Origin"] = "*";
                response.Headers["Access-Control-Allow-Methods"] = "GET";
                response.Headers["Content-Type"] = "application/json";
                response.Headers["Pizzas"] = JsonSerializer.Serialize(pizzas);
                response.Headers["Access-Control-Expose-Headers"] = "Pizzas";

                return response;
            };
        }
    }
}
