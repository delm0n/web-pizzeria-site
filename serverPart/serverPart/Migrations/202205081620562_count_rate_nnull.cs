namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class count_rate_nnull : DbMigration
    {
        public override void Up()
        {
            AlterColumn("public.Pizzas", "countRate", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("public.Pizzas", "countRate", c => c.Int());
        }
    }
}
