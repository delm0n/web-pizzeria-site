namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_rating : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Pizzas", "Rating", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("public.Pizzas", "Rating");
        }
    }
}
