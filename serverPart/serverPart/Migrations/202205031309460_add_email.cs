namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_email : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Clients", "Email", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("public.Clients", "Email");
        }
    }
}
