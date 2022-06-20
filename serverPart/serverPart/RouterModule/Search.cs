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
    public class Search : NancyModule
    {
        public Search()
        {
            Get["/search/{input}", runAsync: true] = async (x, token) =>
            {
                string input = x.input;
                string[] words = input.Split(' ');

                List<Pizza> returnPizzas = new List<Pizza>();
                List<Dish> returnDishes = new List<Dish>();

                using (var dbContext = new ApplicationContext())
                {
                    List<Pizza> pizzas = await dbContext.Pizzas.OrderBy(d => d.PizzaName).ToListAsync();
                    //List<string> pizza_name = new List<string>(); List<string> pizza_decript = new List<string>();
                    for (int i = 0; i < pizzas.Count; i++)
                    {
                        bool addPizzaFlug = true;

                        for (int w = 0; w < words.Length; w++)
                        {
                            //если не содержит ни в описании, ни в названии, то пропускаем слово
                            if (!pizzas[i].PizzaName.ToLower().Contains(words[w].ToLower()) 
                            && !pizzas[i].Structure.ToLower().Contains(words[w].ToLower()))
                            {
                                addPizzaFlug = false;
                                break;
                            }
                        }

                        if (addPizzaFlug)
                            returnPizzas.Add(pizzas[i]);
                    }

                    List<Dish> dishes = await dbContext.Dishes.OrderBy(d => d.Name).ToListAsync();
                    for (int i = 0; i < dishes.Count; i++)
                    {
                        bool addDishFlug = true;
                        for (int w = 0; w < words.Length; w++)
                        {
                            //если не содержит ни в описании, ни в названии, то пропускаем слово
                            if (!dishes[i].Name.ToLower().Contains( words[w].ToLower()) 
                            && !dishes[i].Structure.ToLower().Contains( words[w].ToLower()))
                            {
                                addDishFlug = false;
                                break;
                            }  
                        }

                        if (addDishFlug) 
                            returnDishes.Add(dishes[i]);
                    }

                    var response = new Response();
                    response.Headers["Access-Control-Allow-Origin"] = "*";
                    response.Headers["Access-Control-Allow-Methods"] = "GET";
                    response.Headers["Content-Type"] = "application/json";
                    response.Headers["Pizzas"] = JsonSerializer.Serialize(returnPizzas);
                    response.Headers["Dishes"] = JsonSerializer.Serialize(returnDishes);
                    response.Headers["Access-Control-Expose-Headers"] = "Pizzas, Dishes";
                    return response;                  
                }
            };
        }
    }
}
