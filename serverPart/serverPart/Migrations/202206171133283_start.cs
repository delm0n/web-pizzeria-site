namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class start : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "public.Carts",
                c => new
                    {
                        CartId = c.Int(nullable: false, identity: true),
                        ClientId = c.Int(nullable: false),
                        PizzaIdJson = c.String(),
                        PizzaSizeIdJson = c.String(),
                        PizzaIngredientIdJson = c.String(),
                        PizzaCount = c.String(),
                        DishIdJson = c.String(),
                        DishCount = c.String(),
                    })
                .PrimaryKey(t => t.CartId);
            
            CreateTable(
                "public.Clients",
                c => new
                    {
                        ClientId = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        Telephone = c.String(),
                        Email = c.String(),
                        Password = c.String(),
                        PizzaOrderJson = c.String(),
                    })
                .PrimaryKey(t => t.ClientId);
            
            CreateTable(
                "public.Orders",
                c => new
                    {
                        OrderId = c.Int(nullable: false, identity: true),
                        ClientId = c.Int(),
                        PizzaIdJson = c.String(),
                        PizzaSizeIdJson = c.String(),
                        PizzaIngredientIdJson = c.String(),
                        PizzaCount = c.String(),
                        DishIdJson = c.String(),
                        DishCount = c.String(),
                        TypeOfPay = c.String(),
                        DateOrder = c.String(),
                        LastPrice = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.OrderId)
                .ForeignKey("public.Clients", t => t.ClientId)
                .Index(t => t.ClientId);
            
            CreateTable(
                "public.Dishes",
                c => new
                    {
                        DishId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        UrlImg = c.String(),
                        Structure = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Mass = c.Int(nullable: false),
                        DishType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.DishId);
            
            CreateTable(
                "public.Ingredients",
                c => new
                    {
                        IngredientId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        UrlImg = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Mass = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.IngredientId);
            
            CreateTable(
                "public.Pizzas",
                c => new
                    {
                        PizzaId = c.Int(nullable: false, identity: true),
                        UrlImg = c.String(),
                        PizzaName = c.String(),
                        Structure = c.String(),
                        MinPrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Rating = c.Double(nullable: false),
                        СountOrder = c.Int(nullable: false),
                        IdClientRateJson = c.String(),
                        ClientRateJson = c.String(),
                        PizzaType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.PizzaId);
            
            CreateTable(
                "public.PizzaSizes",
                c => new
                    {
                        PizzaSizeId = c.Int(nullable: false, identity: true),
                        NameSize = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Mass = c.Int(nullable: false),
                        PizzaId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.PizzaSizeId)
                .ForeignKey("public.Pizzas", t => t.PizzaId, cascadeDelete: true)
                .Index(t => t.PizzaId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("public.PizzaSizes", "PizzaId", "public.Pizzas");
            DropForeignKey("public.Orders", "ClientId", "public.Clients");
            DropIndex("public.PizzaSizes", new[] { "PizzaId" });
            DropIndex("public.Orders", new[] { "ClientId" });
            DropTable("public.PizzaSizes");
            DropTable("public.Pizzas");
            DropTable("public.Ingredients");
            DropTable("public.Dishes");
            DropTable("public.Orders");
            DropTable("public.Clients");
            DropTable("public.Carts");
        }
    }
}
