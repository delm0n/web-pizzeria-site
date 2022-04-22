using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using serverPart.Data.Entity;

namespace serverPart.Data
{
    class ApplicationContext : DbContext
    {
        public DbSet<Pizza> Pizzas { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<PizzaSize> PizzaSizes { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Dish> Dishes { get; set; }
        public DbSet<Cart> Carts { get; set; }


        //public DbSet<ClientCart> Carts { get; set; }

        /*
        public DbSet<Order> Orders { get; set; }
        public DbSet<Drink> Drinks { get; set; }
        public DbSet<Dessert> Desserts { get; set; }
        public DbSet<Salad> Salads { get; set; }
        public DbSet<Snack> Snacks { get; set; }
        */

        public ApplicationContext() : base(nameOrConnectionString: "PGConnectionString") { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("public");
            base.OnModelCreating(modelBuilder);
        }
    }
}
