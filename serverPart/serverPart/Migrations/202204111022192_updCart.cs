namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updCart : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Carts", "PizzaCount", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("public.Carts", "PizzaCount");
        }
    }
}
