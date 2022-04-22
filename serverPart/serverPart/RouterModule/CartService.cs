using Nancy;
using Nancy.ModelBinding;
using Newtonsoft.Json;
using serverPart.Data;
using serverPart.Data.Entity;
using serverPart.Data.Helper;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace serverPart.RouterModule
{
    public class CartService : NancyModule
    {
        public CartService()
        {
            Post["/add-pizza-in-cart/{id_client}", runAsync: true] = async (x, token) =>
            {
                PizzaCart pizzaCart = this.Bind<PizzaCart>();
                int id_client = x.id_client;
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {

                    using (var dbContext = new ApplicationContext())
                    {

                        Cart cart = await dbContext.Carts.Where(c => c.ClientId == id_client).FirstOrDefaultAsync();

                        if (cart != null)
                        {
                            List<int> idPizzas = new List<int>(); List<int> idSizePizzas = new List<int>(); List<int> countPizzas = new List<int>();

                            List<List<int>> ingredients_array = new List<List<int>>();
                            List<int> subIngr = new List<int>();


                            if (JsonConvert.DeserializeObject<List<int>>(cart.PizzaIdJson) != null)
                            {
                                ingredients_array.AddRange(JsonConvert.DeserializeObject<List<List<int>>>(cart.PizzaIngredientIdJson));
                                idPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaIdJson));
                                idSizePizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaSizeIdJson));
                                countPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaCount));
                            }

                            idPizzas.Add(pizzaCart.PizzaId);
                            idSizePizzas.Add(pizzaCart.Size.PizzaSizeId);
                            countPizzas.Add(pizzaCart.Count);

                            for (int i = 0; i < pizzaCart.Ingredients.Count; i++)
                                subIngr.Add(pizzaCart.Ingredients[i].IngredientId);
                            ingredients_array.Add(subIngr);

                            cart.PizzaIngredientIdJson = JsonConvert.SerializeObject(ingredients_array);
                            cart.PizzaIdJson = JsonConvert.SerializeObject(idPizzas);
                            cart.PizzaSizeIdJson = JsonConvert.SerializeObject(idSizePizzas);
                            cart.PizzaCount = JsonConvert.SerializeObject(countPizzas);

                            await dbContext.SaveChangesAsync();

                            return new Response { StatusCode = HttpStatusCode.OK };
                        }

                        else
                        {
                            return new Response { StatusCode = HttpStatusCode.NotFound };
                        }
                    }
                }
                else return new Response { StatusCode = HttpStatusCode.NotFound };
            };


            Get["/delete-pizza-from-cart/{id_client}&&{index_array}", runAsync: true] = async (x, token) =>
            {

                int id_client = x.id_client;
                int index_array = x.index_array;
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    using (var dbContext = new ApplicationContext())
                    {

                        Cart cart = await dbContext.Carts.Where(c => c.ClientId == id_client).FirstOrDefaultAsync();

                        if (cart != null)
                        {
                            List<int> idPizzas = new List<int>(); List<int> idSizePizzas = new List<int>(); List<int> countPizzas = new List<int>();

                            List<List<int>> ingredients_array = new List<List<int>>();
                            List<int> subIngr = new List<int>();


                            if (JsonConvert.DeserializeObject<List<int>>(cart.PizzaIdJson) != null)
                            {
                                ingredients_array.AddRange(JsonConvert.DeserializeObject<List<List<int>>>(cart.PizzaIngredientIdJson));
                                idPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaIdJson));
                                idSizePizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaSizeIdJson));
                                countPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaCount));
                            }

                            idPizzas.RemoveAt(index_array);
                            idSizePizzas.RemoveAt(index_array);
                            countPizzas.RemoveAt(index_array);
                            ingredients_array.RemoveAt(index_array);

                            cart.PizzaIngredientIdJson = JsonConvert.SerializeObject(ingredients_array);
                            cart.PizzaIdJson = JsonConvert.SerializeObject(idPizzas);
                            cart.PizzaSizeIdJson = JsonConvert.SerializeObject(idSizePizzas);
                            cart.PizzaCount = JsonConvert.SerializeObject(countPizzas);

                            await dbContext.SaveChangesAsync();

                            return new Response { StatusCode = HttpStatusCode.OK };
                        }

                        else
                        {
                            return new Response { StatusCode = HttpStatusCode.NotFound };
                        }
                    }
                }
                else return new Response { StatusCode = HttpStatusCode.NotFound };
            };


            /*Get["/counter-pizza-in-cart/{id_client}&&{index_array}&&{count_re}", runAsync: true] = async (x, token) =>
            {

                int id_client = x.id_client;
                int index_array = x.index_array;
                int count_re = x.count_re;
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    using (var dbContext = new ApplicationContext())
                    {

                        Cart cart = await dbContext.Carts.Where(c => c.ClientId == id_client).FirstOrDefaultAsync();

                        if (cart != null)
                        {
                            List<int> idPizzas = new List<int>();List<int> countPizzas = new List<int>();


                            if (JsonConvert.DeserializeObject<List<int>>(cart.PizzaIdJson) != null)
                            {
                                countPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaCount));
                            }

                            countPizzas[index_array] = count_re;

                            cart.PizzaCount = JsonConvert.SerializeObject(countPizzas);

                            await dbContext.SaveChangesAsync();

                            return new Response { StatusCode = HttpStatusCode.OK };
                        }

                        else
                        {
                            return new Response { StatusCode = HttpStatusCode.NotFound };
                        }
                    }
                }
                else return new Response { StatusCode = HttpStatusCode.NotFound };
            };*/


            Get["/plus-counter-pizza-in-cart/{id_client}&&{index_array}", runAsync: true] = async (x, token) =>
            {

                int id_client = x.id_client;
                int index_array = x.index_array;
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    using (var dbContext = new ApplicationContext())
                    {

                        Cart cart = await dbContext.Carts.Where(c => c.ClientId == id_client).FirstOrDefaultAsync();

                        if (cart != null)
                        {
                            List<int> idPizzas = new List<int>(); List<int> countPizzas = new List<int>();


                            if (JsonConvert.DeserializeObject<List<int>>(cart.PizzaIdJson) != null)
                            {
                                countPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaCount));
                            }

                            countPizzas[index_array] = countPizzas[index_array] + 1;

                            cart.PizzaCount = JsonConvert.SerializeObject(countPizzas);

                            await dbContext.SaveChangesAsync();

                            return new Response { StatusCode = HttpStatusCode.OK };
                        }

                        else
                        {
                            return new Response { StatusCode = HttpStatusCode.NotFound };
                        }
                    }
                }
                else return new Response { StatusCode = HttpStatusCode.NotFound };
            }; 


            Get["/minus-counter-pizza-in-cart/{id_client}&&{index_array}", runAsync: true] = async (x, token) =>
            {

                int id_client = x.id_client;
                int index_array = x.index_array;
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    using (var dbContext = new ApplicationContext())
                    {

                        Cart cart = await dbContext.Carts.Where(c => c.ClientId == id_client).FirstOrDefaultAsync();

                        if (cart != null)
                        {
                            List<int> idPizzas = new List<int>(); List<int> countPizzas = new List<int>();


                            if (JsonConvert.DeserializeObject<List<int>>(cart.PizzaIdJson) != null)
                            {
                                countPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaCount));
                            }

                            countPizzas[index_array] = countPizzas[index_array] - 1;

                            cart.PizzaCount = JsonConvert.SerializeObject(countPizzas);

                            await dbContext.SaveChangesAsync();

                            return new Response { StatusCode = HttpStatusCode.OK };
                        }

                        else
                        {
                            return new Response { StatusCode = HttpStatusCode.NotFound };
                        }
                    }
                }
                else return new Response { StatusCode = HttpStatusCode.NotFound };
            };


            Get["/get-pizzas-from-cart/{id_client}", runAsync: true] = async (x, token) =>
            {
                int id_client = x.id_client;
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                using (var dbContext = new ApplicationContext())
                {
                    Cart cart = await dbContext.Carts.Where(c => c.ClientId == id_client).FirstOrDefaultAsync();

                    if (cart != null)
                    {
                        List<int> idPizzas = new List<int>(); List<int> idSizePizzas = new List<int>(); List<int> countPizzas = new List<int>();
                        List<List<int>> ingredients_array = new List<List<int>>();


                        if (JsonConvert.DeserializeObject<List<int>>(cart.PizzaIdJson) != null)
                        {
                            ingredients_array.AddRange(JsonConvert.DeserializeObject<List<List<int>>>(cart.PizzaIngredientIdJson));
                            idPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaIdJson));
                            idSizePizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaSizeIdJson));
                            countPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaCount));

                            List<PizzaCart> pizzasCart = new List<PizzaCart>();

                            for (int i = 0; i < idPizzas.Count; i++)
                            {
                                List<int> subIngr = new List<int>();
                                subIngr.AddRange(ingredients_array[i]);

                                List<Ingredient> ingredients = new List<Ingredient>();
                                for (int j = 0; j < subIngr.Count; j++)
                                {
                                    int idIngr_dynamic = subIngr[j];
                                    ingredients.Add(await dbContext.Ingredients.FirstOrDefaultAsync(ing => ing.IngredientId == idIngr_dynamic));
                                }

                                int idPizza_dynamic = idPizzas[i];
                                Pizza pizza = await dbContext.Pizzas.FirstOrDefaultAsync(p => p.PizzaId == idPizza_dynamic);

                                int idPizzaSize_dynamic = idSizePizzas[i];
                                PizzaSize pizzaSize = await dbContext.PizzaSizes.FirstOrDefaultAsync(s => s.PizzaSizeId == idPizzaSize_dynamic);
                                pizzaSize.Pizza = null;


                                pizzasCart.Add(new PizzaCart
                                {
                                    Count = countPizzas[i],
                                    PizzaId = pizza.PizzaId,
                                    PizzaName = pizza.PizzaName,
                                    Structure = pizza.Structure,
                                    UrlImg = pizza.UrlImg,
                                    Size = pizzaSize,
                                    Ingredients = ingredients,
                                });
                            }

                            var response = new Response();

                            response.StatusCode = (Nancy.HttpStatusCode)200;
                            response.Headers["Access-Control-Allow-Origin"] = "*";
                            response.Headers["Access-Control-Allow-Method"] = "GET";

                            response.Headers["Access-Control-Expose-Headers"] = "Pizzas";
                            response.Headers["Content-Type"] = "application/json";
                            response.Headers["Pizzas"] = System.Text.Json.JsonSerializer.Serialize(pizzasCart);

                            return response;

                        }
                        else
                        {
                            return new Response { StatusCode = HttpStatusCode.NoContent };
                        }
                    }
                    else
                    {
                        return new Response { StatusCode = HttpStatusCode.NotFound };
                    }
                }
            };






            Post["/add-dish-in-cart/{id_client}", runAsync: true] = async (x, token) =>
            {
                DishCart dish = this.Bind<DishCart>();

                int id_client = x.id_client;
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    using (var dbContext = new ApplicationContext())
                    {

                        Cart cart = await dbContext.Carts.Where(c => c.ClientId == id_client).FirstOrDefaultAsync();

                        if (cart != null)
                        {
                            List<int> idDishes = new List<int>(); List<int> countDishes = new List<int>();

                            if (JsonConvert.DeserializeObject<List<int>>(cart.DishIdJson) != null)
                            {
                                idDishes.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.DishIdJson));
                                countDishes.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.DishCount));
                            }

                            idDishes.Add(dish.DishId);
                            countDishes.Add(dish.Count);

                            cart.DishIdJson = JsonConvert.SerializeObject(idDishes);
                            cart.DishCount = JsonConvert.SerializeObject(countDishes);

                            await dbContext.SaveChangesAsync();

                            return new Response { StatusCode = HttpStatusCode.OK };
                        }

                        else
                        {
                            return new Response { StatusCode = HttpStatusCode.NotFound };
                        }
                    }
                }
                else return new Response { StatusCode = HttpStatusCode.NotFound };
            };


            Get["/get-dish-from-cart/{id_client}", runAsync: true] = async (x, token) =>
            {
                int id_client = x.id_client;
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                using (var dbContext = new ApplicationContext())
                {
                    Cart cart = await dbContext.Carts.Where(c => c.ClientId == id_client).FirstOrDefaultAsync();

                    if (cart != null)
                    {
                        List<int> idDishes = new List<int>(); List<int> countDishes = new List<int>();


                        if (JsonConvert.DeserializeObject<List<int>>(cart.DishIdJson) != null)
                        {
                            countDishes.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.DishCount));
                            idDishes.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.DishIdJson));

                            List<DishCart> dishesCart = new List<DishCart>();

                            for (int i = 0; i < idDishes.Count; i++)
                            {
                                int idDish_dynamic = idDishes[i];
                                Dish dish = await dbContext.Dishes.FirstOrDefaultAsync(d => d.DishId == idDish_dynamic);

                                dishesCart.Add(new DishCart
                                {
                                    DishId = idDish_dynamic,
                                    DishType = (DishCart.TypesEnum)dish.DishType,
                                    Mass = dish.Mass,
                                    Price = dish.Price,
                                    Name = dish.Name,
                                    UrlImg = dish.UrlImg,
                                    Count = countDishes[i]
                                });
                            }

                            var response = new Response();

                            response.StatusCode = (Nancy.HttpStatusCode)200;
                            response.Headers["Access-Control-Allow-Origin"] = "*";
                            response.Headers["Access-Control-Allow-Method"] = "GET";

                            response.Headers["Access-Control-Expose-Headers"] = "Dishes";
                            response.Headers["Content-Type"] = "application/json";
                            response.Headers["Dishes"] = System.Text.Json.JsonSerializer.Serialize(dishesCart);

                            return response;

                        }
                        else
                        {
                            return new Response { StatusCode = HttpStatusCode.NoContent};
                        }
                    }
                    else
                    {
                        return new Response { StatusCode = HttpStatusCode.NotFound };
                    }
                }
            };


            Post["/delete-dish-from-cart/{id_client}", runAsync: true] = async (x, token) =>
            {

                DishCart dish = this.Bind<DishCart>();
                //int id_dish = dish.DishId;
                int id_client = x.id_client;
                
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    using (var dbContext = new ApplicationContext())
                    {

                        Cart cart = await dbContext.Carts.Where(c => c.ClientId == id_client).FirstOrDefaultAsync();

                        if (cart != null)
                        {
                            List<int> idDishes = new List<int>(); List<int> countDishes = new List<int>();

                            if (JsonConvert.DeserializeObject<List<int>>(cart.DishIdJson) != null)
                            {
                                idDishes.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.DishIdJson));
                                countDishes.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.DishCount));
                            }

                            for( int i = 0; i < idDishes.Count; i++ )
                            {
                                if (idDishes[i] == dish.DishId)
                                {
                                    idDishes.Remove(idDishes[i]);
                                    countDishes.Remove(countDishes[i]);
                                }
                            }

                            cart.DishIdJson = JsonConvert.SerializeObject(idDishes);
                            cart.DishCount = JsonConvert.SerializeObject(countDishes);

                            await dbContext.SaveChangesAsync();

                            return new Response { StatusCode = HttpStatusCode.OK };
                        }

                        else
                        {
                            return new Response { StatusCode = HttpStatusCode.NotFound };
                        }
                    }
                }
                else return new Response { StatusCode = HttpStatusCode.NotFound };
            };


            Post["/plus-counter-dish-from-cart/{id_client}", runAsync: true] = async (x, token) =>
            {

                DishCart dish = this.Bind<DishCart>();
             
                int id_client = x.id_client;

                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    using (var dbContext = new ApplicationContext())
                    {

                        Cart cart = await dbContext.Carts.Where(c => c.ClientId == id_client).FirstOrDefaultAsync();

                        if (cart != null)
                        {
                            List<int> idDishes = new List<int>(); List<int> countDishes = new List<int>();

                            if (JsonConvert.DeserializeObject<List<int>>(cart.DishIdJson) != null)
                            {
                                idDishes.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.DishIdJson));
                                countDishes.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.DishCount));
                            }

                            for (int i = 0; i < idDishes.Count; i++)
                                if (idDishes[i] == dish.DishId)
                                    countDishes[i] = countDishes[i]+1;
                           
                            cart.DishCount = JsonConvert.SerializeObject(countDishes);

                            await dbContext.SaveChangesAsync();

                            return new Response { StatusCode = HttpStatusCode.OK };
                        }

                        else
                        {
                            return new Response { StatusCode = HttpStatusCode.NotFound };
                        }
                    }
                }
                else return new Response { StatusCode = HttpStatusCode.NotFound };
            };


            Post["/minus-counter-dish-from-cart/{id_client}", runAsync: true] = async (x, token) =>
            {

                DishCart dish = this.Bind<DishCart>();

                int id_client = x.id_client;

                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    using (var dbContext = new ApplicationContext())
                    {

                        Cart cart = await dbContext.Carts.Where(c => c.ClientId == id_client).FirstOrDefaultAsync();

                        if (cart != null)
                        {
                            List<int> idDishes = new List<int>(); List<int> countDishes = new List<int>();

                            if (JsonConvert.DeserializeObject<List<int>>(cart.DishIdJson) != null)
                            {
                                idDishes.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.DishIdJson));
                                countDishes.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.DishCount));
                            }

                            for (int i = 0; i < idDishes.Count; i++)
                                if (idDishes[i] == dish.DishId)
                                    countDishes[i] = countDishes[i]-1;

                            cart.DishCount = JsonConvert.SerializeObject(countDishes);

                            await dbContext.SaveChangesAsync();

                            return new Response { StatusCode = HttpStatusCode.OK };
                        }

                        else
                        {
                            return new Response { StatusCode = HttpStatusCode.NotFound };
                        }
                    }
                }
                else return new Response { StatusCode = HttpStatusCode.NotFound };
            };

        }
    }
}
