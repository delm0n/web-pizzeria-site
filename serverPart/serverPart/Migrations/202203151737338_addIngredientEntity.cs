namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addIngredientEntity : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "public.Ingredients",
                c => new
                    {
                        IngredientId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Mass = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.IngredientId);
            
            AddColumn("public.Pizzas", "Size", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("public.Pizzas", "Size");
            DropTable("public.Ingredients");
        }
    }
}
