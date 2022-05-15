namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class rating_v2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Pizzas", "IdClientRateJson", c => c.String());
            AddColumn("public.Pizzas", "ClientRateJson", c => c.String());
            DropColumn("public.Pizzas", "countRate");
        }
        
        public override void Down()
        {
            AddColumn("public.Pizzas", "countRate", c => c.Int(nullable: false));
            DropColumn("public.Pizzas", "ClientRateJson");
            DropColumn("public.Pizzas", "IdClientRateJson");
        }
    }
}
