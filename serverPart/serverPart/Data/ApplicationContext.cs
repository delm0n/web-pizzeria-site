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
        public ApplicationContext() : base(nameOrConnectionString: "PGConnectionString") { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("public");
            base.OnModelCreating(modelBuilder);
        }
    }
}
