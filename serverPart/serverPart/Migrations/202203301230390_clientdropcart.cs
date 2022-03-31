namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class clientdropcart : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("public.ClientCarts", "ClientCartId", "public.Clients");
            DropIndex("public.ClientCarts", new[] { "ClientCartId" });
            AddColumn("public.Clients", "PizzaCartJson", c => c.String());
            DropColumn("public.Clients", "ClientCartId");
            DropTable("public.ClientCarts");
        }
        
        public override void Down()
        {
            CreateTable(
                "public.ClientCarts",
                c => new
                    {
                        ClientCartId = c.Int(nullable: false),
                        ClientId = c.Int(nullable: false),
                        PizzaJson = c.String(),
                    })
                .PrimaryKey(t => t.ClientCartId);
            
            AddColumn("public.Clients", "ClientCartId", c => c.Int(nullable: false));
            DropColumn("public.Clients", "PizzaCartJson");
            CreateIndex("public.ClientCarts", "ClientCartId");
            AddForeignKey("public.ClientCarts", "ClientCartId", "public.Clients", "ClientId");
        }
    }
}
