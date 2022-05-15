namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class count_rate : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Pizzas", "countRate", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("public.Pizzas", "countRate");
        }
    }
}
