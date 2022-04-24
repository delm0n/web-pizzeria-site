namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_type_pizzas : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Dishes", "Structure", c => c.String());
            AddColumn("public.Pizzas", "PizzaType", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("public.Pizzas", "PizzaType");
            DropColumn("public.Dishes", "Structure");
        }
    }
}
