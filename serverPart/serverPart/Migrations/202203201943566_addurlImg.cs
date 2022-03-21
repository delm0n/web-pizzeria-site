namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addurlImg : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Pizzas", "UrlImg", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("public.Pizzas", "UrlImg");
        }
    }
}
