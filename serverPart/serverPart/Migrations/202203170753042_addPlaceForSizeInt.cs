namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addPlaceForSizeInt : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("public.PizzaSizes", "Pizza_PizzaId", "public.Pizzas");
            DropIndex("public.PizzaSizes", new[] { "Pizza_PizzaId" });
            RenameColumn(table: "public.PizzaSizes", name: "Pizza_PizzaId", newName: "PizzaId");
            AlterColumn("public.PizzaSizes", "PizzaId", c => c.Int(nullable: false));
            CreateIndex("public.PizzaSizes", "PizzaId");
            AddForeignKey("public.PizzaSizes", "PizzaId", "public.Pizzas", "PizzaId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("public.PizzaSizes", "PizzaId", "public.Pizzas");
            DropIndex("public.PizzaSizes", new[] { "PizzaId" });
            AlterColumn("public.PizzaSizes", "PizzaId", c => c.Int());
            RenameColumn(table: "public.PizzaSizes", name: "PizzaId", newName: "Pizza_PizzaId");
            CreateIndex("public.PizzaSizes", "Pizza_PizzaId");
            AddForeignKey("public.PizzaSizes", "Pizza_PizzaId", "public.Pizzas", "PizzaId");
        }
    }
}
