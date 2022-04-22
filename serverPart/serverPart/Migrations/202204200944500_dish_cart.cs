namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class dish_cart : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Carts", "DishIdJson", c => c.String());
            AddColumn("public.Carts", "DishCount", c => c.String());
            DropColumn("public.Carts", "AddishIdJson");
        }
        
        public override void Down()
        {
            AddColumn("public.Carts", "AddishIdJson", c => c.String());
            DropColumn("public.Carts", "DishCount");
            DropColumn("public.Carts", "DishIdJson");
        }
    }
}
