namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addpizzarelative : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Pizzas", "Price", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("public.Pizzas", "Mass", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("public.Pizzas", "Mass");
            DropColumn("public.Pizzas", "Price");
        }
    }
}
