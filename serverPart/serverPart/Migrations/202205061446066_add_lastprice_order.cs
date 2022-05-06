namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_lastprice_order : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Orders", "LastPrice", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("public.Orders", "LastPrice");
        }
    }
}
