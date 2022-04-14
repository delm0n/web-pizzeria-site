namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addCartClass : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "public.Carts",
                c => new
                    {
                        ClientId = c.Int(nullable: false),
                        PizzaIdJson = c.String(),
                        PizzaSizeIdJson = c.String(),
                        PizzaIngredientIdJson = c.String(),
                        AddishIdJson = c.String(),
                    })
                .PrimaryKey(t => t.ClientId)
                .ForeignKey("public.Clients", t => t.ClientId)
                .Index(t => t.ClientId);
            
            DropColumn("public.Clients", "PizzaCartJson");
        }
        
        public override void Down()
        {
            AddColumn("public.Clients", "PizzaCartJson", c => c.String());
            DropForeignKey("public.Carts", "ClientId", "public.Clients");
            DropIndex("public.Carts", new[] { "ClientId" });
            DropTable("public.Carts");
        }
    }
}
