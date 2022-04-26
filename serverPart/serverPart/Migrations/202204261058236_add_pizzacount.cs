namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_pizzacount : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Pizzas", "countOrder", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("public.Pizzas", "countOrder");
        }
    }
}
