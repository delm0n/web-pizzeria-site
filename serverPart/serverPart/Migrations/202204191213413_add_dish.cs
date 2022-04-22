namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_dish : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "public.Dishes",
                c => new
                    {
                        DishId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        UrlImg = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Mass = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.DishId);
            
            DropTable("public.Desserts");
        }
        
        public override void Down()
        {
            CreateTable(
                "public.Desserts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        UrlImg = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Mass = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            DropTable("public.Dishes");
        }
    }
}
