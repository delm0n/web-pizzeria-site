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
    public class HomePage : NancyModule
    {
        public HomePage()
        {
            Get["/pizza", runAsync: true] = async (x, token) =>
            {
                List <Pizza> pizzas = new List<Pizza>();

                using (var dbContext = new ApplicationContext())
                {
                    pizzas = await dbContext.Pizzas.ToListAsync();
                }

                return Response.AsJson(pizzas);
            };

            Get["/sizeofasync/{id}", runAsync: true] = async (x, token) =>
            {
                List<PizzaSize> pizzaSize = new List<PizzaSize>();
                int param = x.id;
                using (var dbContext = new ApplicationContext())
                {
                    pizzaSize = await dbContext.PizzaSizes.Where(p => p.PizzaId == param).ToListAsync();
                }

                return Response.AsJson(pizzaSize);
            };

            Get["/ingreds", runAsync: true] = async (x, token) =>
            {
                List<Ingredient> ingredients = new List<Ingredient>();

                using (var dbContext = new ApplicationContext())
                {
                    ingredients = await dbContext.Ingredients.ToListAsync();
                }

                return Response.AsJson(ingredients);
            };
        }
    }
}
