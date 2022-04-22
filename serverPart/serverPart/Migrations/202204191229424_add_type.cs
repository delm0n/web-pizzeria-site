namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_type : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Dishes", "DishType", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("public.Dishes", "DishType");
        }
    }
}
