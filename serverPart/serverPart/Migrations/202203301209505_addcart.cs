namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addcart : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "public.ClientCarts",
                c => new
                    {
                        ClientCartId = c.Int(nullable: false),
                        ClientId = c.Int(nullable: false),
                        PizzaJson = c.String(),
                    })
                .PrimaryKey(t => t.ClientCartId)
                .ForeignKey("public.Clients", t => t.ClientCartId)
                .Index(t => t.ClientCartId);
            
            AddColumn("public.Clients", "ClientCartId", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropForeignKey("public.ClientCarts", "ClientCartId", "public.Clients");
            DropIndex("public.ClientCarts", new[] { "ClientCartId" });
            DropColumn("public.Clients", "ClientCartId");
            DropTable("public.ClientCarts");
        }
    }
}
