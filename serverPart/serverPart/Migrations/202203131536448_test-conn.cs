namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class testconn : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "public.Pizzas",
                c => new
                    {
                        PizzaId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.PizzaId);
            
        }
        
        public override void Down()
        {
            DropTable("public.Pizzas");
        }
    }
}
