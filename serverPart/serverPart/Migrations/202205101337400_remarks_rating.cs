namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class remarks_rating : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Pizzas", "СountOrder", c => c.Int());
            DropColumn("public.Clients", "PizzaRateJson");
            DropColumn("public.Pizzas", "countOrder");
        }
        
        public override void Down()
        {
            AddColumn("public.Pizzas", "countOrder", c => c.Int());
            AddColumn("public.Clients", "PizzaRateJson", c => c.String());
            DropColumn("public.Pizzas", "СountOrder");
        }
    }
}
