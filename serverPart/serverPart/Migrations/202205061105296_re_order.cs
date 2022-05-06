namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class re_order : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Orders", "TypeOfPay", c => c.String());
            AddColumn("public.Orders", "DateOrder", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("public.Orders", "DateOrder");
            DropColumn("public.Orders", "TypeOfPay");
        }
    }
}
