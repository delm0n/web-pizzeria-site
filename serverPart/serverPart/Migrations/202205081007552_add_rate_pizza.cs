namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_rate_pizza : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Clients", "PizzaOrderJson", c => c.String());
            AddColumn("public.Clients", "PizzaRateJson", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("public.Clients", "PizzaRateJson");
            DropColumn("public.Clients", "PizzaOrderJson");
        }
    }
}
