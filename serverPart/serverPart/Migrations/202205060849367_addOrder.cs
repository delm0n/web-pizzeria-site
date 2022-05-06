namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addOrder : DbMigration
    {
        public override void Up()
        {
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
                    })
                .PrimaryKey(t => t.OrderId)
                .ForeignKey("public.Clients", t => t.ClientId)
                .Index(t => t.ClientId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("public.Orders", "ClientId", "public.Clients");
            DropIndex("public.Orders", new[] { "ClientId" });
            DropTable("public.Orders");
        }
    }
}
