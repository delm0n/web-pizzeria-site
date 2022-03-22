namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addarrays : DbMigration
    {
        public override void Up()
        {
            
        }
        
        public override void Down()
        {
            AddColumn("public.Pizzas", "Structure", c => c.String());
        }
    }
}
