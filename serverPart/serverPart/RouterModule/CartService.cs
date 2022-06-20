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

            Post["/synchronization-cart", runAsync: true] = async (x, token) =>
            {
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    using (var dbContext = new ApplicationContext())
                    {
                        SynhCart SynPizza = this.Bind<SynhCart>();

                        //здесь пиццы до входа
                        List<PizzaCart> pizzas = JsonConvert.DeserializeObject<List<PizzaCart>>(SynPizza.Pizzas);
                        List<DishCart> dishes = JsonConvert.DeserializeObject<List<DishCart>>(SynPizza.Dishes);

                        Cart cart = await dbContext.Carts.Where(c => c.ClientId == SynPizza.ClientId).FirstOrDefaultAsync();

                        
                            #region Pizza

                            //здесь сохранившиеся пиццы в корзине 
                            List<int> idPizzas = new List<int>(); List<int> idSizePizzas = new List<int>();
                            List<int> countPizzas = new List<int>();
                            List<List<int>> ingredients_array = new List<List<int>>();
                            List<int> subIngr = new List<int>();

                            if (JsonConvert.DeserializeObject<List<int>>(cart.PizzaIdJson) != null)
                            {
                                ingredients_array.AddRange(JsonConvert.DeserializeObject<List<List<int>>>(cart.PizzaIngredientIdJson));
                                idPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaIdJson));
                                idSizePizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaSizeIdJson));
                                countPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaCount));
                            }

                            for (int k = 0; k < pizzas.Count; k++)
                            {

                                //перед тем, как добавлять, надо проверить на совпадение пицц здесь и увеличить количество
                                bool no_exist = true;

                                for (int i = 0; i < idPizzas.Count; i++)
                                {
                                    if (idPizzas[i] == pizzas[k].PizzaId && idSizePizzas[i] == pizzas[k].Size.PizzaSizeId
                                    && ingredients_array[i].Count == pizzas[k].Ingredients.Count)
                                    {
                                        bool check_ingr = true;

                                        for (int j = 0; j < ingredients_array[i].Count; j++)
                                        {

                                            if (pizzas[k].Ingredients[j].IngredientId == ingredients_array[i][j])
                                            {
                                                //один из элементов совпал
                                            }

                                            else
                                            {
                                                check_ingr = false;
                                            }
                                        }

                                        if (check_ingr)
                                        {
                                            countPizzas[i] = countPizzas[i] + pizzas[k].Count;
                                            no_exist = false;
                                            break;
                                        }

                                    }
                                }

                                //если такой пиццы нет, то добавляем её
                                if (no_exist)
                                {
                                    idPizzas.Add(pizzas[k].PizzaId);
                                    idSizePizzas.Add(pizzas[k].Size.PizzaSizeId);
                                    countPizzas.Add(pizzas[k].Count);

                                    for (int i = 0; i < pizzas[k].Ingredients.Count; i++)
                                        subIngr.Add(pizzas[k].Ingredients[i].IngredientId);
                                    ingredients_array.Add(subIngr);
                                }

                            }

                            


                            List<PizzaCart> pizzasCart = new List<PizzaCart>();

                            for (int i = 0; i < idPizzas.Count; i++)
                            {
                                subIngr = new List<int>();
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
                                //pizzaSize.Pizza = null;


                                pizzasCart.Add(new PizzaCart
                                {
                                    Count = countPizzas[i],
                                    PizzaId = pizza.PizzaId,
                                    PizzaName = pizza.PizzaName,
                                    Structure = pizza.Structure,
                                    UrlImg = pizza.UrlImg,
                                    Size = pizzaSize,
                                    Ingredients = ingredients,
                                    PizzaType = (PizzaCart.TypesPizzaEnum)pizza.PizzaType
                                });
                            }

                            #endregion
                        

                       

                        
                            #region Dish

                            List<int> idDishes = new List<int>(); List<int> countDishes = new List<int>();

                            if (JsonConvert.DeserializeObject<List<int>>(cart.DishIdJson) != null)
                            {
                                idDishes.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.DishIdJson));
                                countDishes.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.DishCount));
                            }

                            for (int k = 0; k < dishes.Count; k++)
                            {
                                bool no_exist = true;

                                for (int i = 0; i < idDishes.Count; i++)
                                {
                                    if (idDishes[i] == dishes[k].DishId)
                                    {
                                        countDishes[i] = countDishes[i] + dishes[k].Count;
                                        no_exist = false;
                                        break;
                                    }
                                }

                                if (no_exist)
                                {
                                    idDishes.Add(dishes[k].DishId);
                                    countDishes.Add(dishes[k].Count);
                                }

                            }

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
                                    Structure = dish.Structure,
                                    Count = countDishes[i]
                                });
                            }

                        #endregion

                        if (pizzas.Count > 0 || dishes.Count > 0)
                        {
                            cart.PizzaIngredientIdJson = JsonConvert.SerializeObject(ingredients_array);
                            cart.PizzaIdJson = JsonConvert.SerializeObject(idPizzas);
                            cart.PizzaSizeIdJson = JsonConvert.SerializeObject(idSizePizzas);
                            cart.PizzaCount = JsonConvert.SerializeObject(countPizzas);
                            cart.DishIdJson = JsonConvert.SerializeObject(idDishes);
                            cart.DishCount = JsonConvert.SerializeObject(countDishes);

                            await dbContext.SaveChangesAsync();
                            
                        }

                        var response = new Response();

                            response.StatusCode = (Nancy.HttpStatusCode)200;
                            response.Headers["Access-Control-Allow-Origin"] = "*";
                            response.Headers["Access-Control-Allow-Method"] = "POST";

                            response.Headers["Access-Control-Expose-Headers"] = "Pizzas, Dishes";
                            
                            response.Headers["Content-Type"] = "application/json";
                            response.Headers["Pizzas"] = System.Text.Json.JsonSerializer.Serialize(pizzasCart);
                            response.Headers["Dishes"] = System.Text.Json.JsonSerializer.Serialize(dishesCart);

                            return response;

                    }
                }
                else return new Response { StatusCode = HttpStatusCode.Unauthorized };
            };


            Post["/add-pizza-in-cart/{id_client}", runAsync: true] = async (x, token) =>
            {
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    using (var dbContext = new ApplicationContext())
                    {
                        PizzaCart pizzaCart = this.Bind<PizzaCart>(); int id_client = x.id_client;
                        Cart cart = await dbContext.Carts.Where(c => c.ClientId == id_client).FirstOrDefaultAsync();

                        if (cart != null)
                        {
                            List<int> idPizzas = new List<int>(); List<int> idSizePizzas = new List<int>(); 
                            List<int> countPizzas = new List<int>(); List<List<int>> ingredients_array = new List<List<int>>(); 
                            List<int> subIngr = new List<int>();

                            if (JsonConvert.DeserializeObject<List<int>>(cart.PizzaIdJson) != null)
                            {
                                ingredients_array.AddRange(JsonConvert.DeserializeObject<List<List<int>>>(cart.PizzaIngredientIdJson));
                                idPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaIdJson));
                                idSizePizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaSizeIdJson));
                                countPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaCount));
                            }

                            //перед тем, как добавлять, надо проверить на совпадение пицц здесь и увеличить количество при таковом
                            bool no_exist = true;
                            for (int i = 0; i < idPizzas.Count; i++)
                            {
                                if (idPizzas[i] == pizzaCart.PizzaId && idSizePizzas[i] == pizzaCart.Size.PizzaSizeId
                                && ingredients_array[i].Count == pizzaCart.Ingredients.Count)
                                {
                                    bool check_ingr = true;
                                    for (int j = 0; j < ingredients_array[i].Count; j++)
                                    {
                                        if (pizzaCart.Ingredients[j].IngredientId == ingredients_array[i][j])
                                        {
                                            //один из элементов совпал
                                        }
                                        else
                                            check_ingr = false;
                                    }

                                    if (check_ingr)
                                    {
                                        countPizzas[i] = countPizzas[i] + pizzaCart.Count;
                                        no_exist = false;
                                        break;
                                    }
                                }
                            }

                            //если такой пиццы нет, то добавляем её
                            if (no_exist)
                            {
                                idPizzas.Add(pizzaCart.PizzaId);
                                idSizePizzas.Add(pizzaCart.Size.PizzaSizeId);
                                countPizzas.Add(pizzaCart.Count);
                                for (int i = 0; i < pizzaCart.Ingredients.Count; i++)
                                    subIngr.Add(pizzaCart.Ingredients[i].IngredientId);
                                ingredients_array.Add(subIngr);
                            }

                            //и сохраняем в бд
                            cart.PizzaIngredientIdJson = JsonConvert.SerializeObject(ingredients_array);
                            cart.PizzaIdJson = JsonConvert.SerializeObject(idPizzas);
                            cart.PizzaSizeIdJson = JsonConvert.SerializeObject(idSizePizzas);
                            cart.PizzaCount = JsonConvert.SerializeObject(countPizzas);
                            await dbContext.SaveChangesAsync();
                            return new Response() { StatusCode = HttpStatusCode.OK };
                        }

                        else
                        { return new Response { StatusCode = HttpStatusCode.NotFound }; }
                    }
                }
                else return new Response { StatusCode = HttpStatusCode.Unauthorized };
            };


            Post["/re-counter-pizza-from-cart/{id_client}", runAsync: true] = async (x, token) =>
            {
 
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    PizzaCart pizzaCart = this.Bind<PizzaCart>();
                    int id_client = x.id_client;

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

                            for (int i = 0; i < idPizzas.Count; i++)
                            {
                                if (idPizzas[i] == pizzaCart.PizzaId && idSizePizzas[i] == pizzaCart.Size.PizzaSizeId
                                && ingredients_array[i].Count == pizzaCart.Ingredients.Count)
                                {
                                    bool check_ingr = true;

                                    for (int j = 0; j < ingredients_array[i].Count; j++)
                                    {

                                        if (pizzaCart.Ingredients[j].IngredientId == ingredients_array[i][j])
                                        {
                                            //один из элементов совпал
                                        }

                                        else
                                        {
                                            check_ingr = false;
                                        }
                                    }

                                    if (check_ingr)
                                    {
                                        countPizzas[i] = pizzaCart.Count;
                                        break;
                                    }

                                }
                            }

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
                else return new Response { StatusCode = HttpStatusCode.Unauthorized };
            };


            Post["/delete-pizza-from-cart/{id_client}", runAsync: true] = async (x, token) =>
            {
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    PizzaCart pizzaCart = this.Bind<PizzaCart>();
                    int id_client = x.id_client;

                    using (var dbContext = new ApplicationContext())
                    {
                        Cart cart = await dbContext.Carts.Where(c => c.ClientId == id_client).FirstOrDefaultAsync();

                        if (cart != null)
                        {
                            List<int> idPizzas = new List<int>(); List<int> idSizePizzas = new List<int>(); 
                            List<int> countPizzas = new List<int>();
                            List<List<int>> ingredients_array = new List<List<int>>(); List<int> subIngr = new List<int>();


                            if (JsonConvert.DeserializeObject<List<int>>(cart.PizzaIdJson) != null)
                            {
                                ingredients_array.AddRange(JsonConvert.DeserializeObject<List<List<int>>>(cart.PizzaIngredientIdJson));
                                idPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaIdJson));
                                idSizePizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaSizeIdJson));
                                countPizzas.AddRange(JsonConvert.DeserializeObject<List<int>>(cart.PizzaCount));
                            }

                            for (int i = 0; i < idPizzas.Count; i++)
                            {
                                if (idPizzas[i] == pizzaCart.PizzaId && idSizePizzas[i] == pizzaCart.Size.PizzaSizeId
                                && ingredients_array[i].Count == pizzaCart.Ingredients.Count)
                                {
                                    bool check_ingr = true;

                                    for (int j = 0; j < ingredients_array[i].Count; j++)
                                    {

                                        if (pizzaCart.Ingredients[j].IngredientId == ingredients_array[i][j])
                                        {
                                            //один из элементов совпал
                                        }

                                        else
                                        {
                                            check_ingr = false;
                                        }
                                    }

                                    if (check_ingr)
                                    {
                                        idPizzas.RemoveAt(i);
                                        idSizePizzas.RemoveAt(i);
                                        countPizzas.RemoveAt(i);
                                        ingredients_array.RemoveAt(i);

                                        break;
                                    }
                                }
                            }           

                            cart.PizzaIngredientIdJson = JsonConvert.SerializeObject(ingredients_array);
                            cart.PizzaIdJson = JsonConvert.SerializeObject(idPizzas);
                            cart.PizzaSizeIdJson = JsonConvert.SerializeObject(idSizePizzas);
                            cart.PizzaCount = JsonConvert.SerializeObject(countPizzas);
                            await dbContext.SaveChangesAsync();
                            return new Response { StatusCode = HttpStatusCode.OK };
                        }

                        else
                        { return new Response { StatusCode = HttpStatusCode.NotFound }; }
                    }
                }
                else return new Response { StatusCode = HttpStatusCode.Unauthorized };
            };


            //====================


            Post["/add-dish-in-cart/{id_client}", runAsync: true] = async (x, token) =>
            {   

                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {

                    DishCart dish = this.Bind<DishCart>();
                    int id_client = x.id_client;

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
                else return new Response { StatusCode = HttpStatusCode.Unauthorized };
            };


            Post["/delete-dish-from-cart/{id_client}", runAsync: true] = async (x, token) =>
            {
                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    DishCart dish = this.Bind<DishCart>();
                    int id_client = x.id_client;

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
                else return new Response { StatusCode = HttpStatusCode.Unauthorized };
            };


            Post["/plus-counter-dish-from-cart/{id_client}", runAsync: true] = async (x, token) =>
            {

                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    DishCart dish = this.Bind<DishCart>();
                    int id_client = x.id_client;

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
                else return new Response { StatusCode = HttpStatusCode.Unauthorized };
            };


            Post["/minus-counter-dish-from-cart/{id_client}", runAsync: true] = async (x, token) =>
            {

                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    DishCart dish = this.Bind<DishCart>();
                    int id_client = x.id_client;

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
                else return new Response { StatusCode = HttpStatusCode.Unauthorized };
            };

            
            Post["/counter-dish-from-cart/{id_client}", runAsync: true] = async (x, token) =>
            {

                string token_headers = Request.Headers["Authorization"].FirstOrDefault();

                if (token_headers == PersonalToken.getToken())
                {
                    DishCart dish = this.Bind<DishCart>();
                    int id_client = x.id_client;

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
                                    countDishes[i] = dish.Count;

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
                else return new Response { StatusCode = HttpStatusCode.Unauthorized };
            };


        }
    }
}
