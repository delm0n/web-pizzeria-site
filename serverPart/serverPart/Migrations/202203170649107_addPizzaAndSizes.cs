namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addPizzaAndSizes : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "public.PizzaSizes",
                c => new
                    {
                        PizzaSizeId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Mass = c.Int(nullable: false),
                        Pizza_PizzaId = c.Int(),
                    })
                .PrimaryKey(t => t.PizzaSizeId)
                .ForeignKey("public.Pizzas", t => t.Pizza_PizzaId)
                .Index(t => t.Pizza_PizzaId);
            
            AddColumn("public.Pizzas", "PizzaName", c => c.String());
            AddColumn("public.Pizzas", "MinPrice", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            DropColumn("public.Pizzas", "Size");
            DropColumn("public.Pizzas", "Name");
            DropColumn("public.Pizzas", "Price");
            DropColumn("public.Pizzas", "Mass");
        }
        
        public override void Down()
        {
            AddColumn("public.Pizzas", "Mass", c => c.Int(nullable: false));
            AddColumn("public.Pizzas", "Price", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("public.Pizzas", "Name", c => c.String());
            AddColumn("public.Pizzas", "Size", c => c.Int(nullable: false));
            DropForeignKey("public.PizzaSizes", "Pizza_PizzaId", "public.Pizzas");
            DropIndex("public.PizzaSizes", new[] { "Pizza_PizzaId" });
            DropColumn("public.Pizzas", "MinPrice");
            DropColumn("public.Pizzas", "PizzaName");
            DropTable("public.PizzaSizes");
        }
    }
}
