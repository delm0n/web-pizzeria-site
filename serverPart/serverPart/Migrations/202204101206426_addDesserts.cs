namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addDesserts : DbMigration
    {
        public override void Up()
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
            
        }
        
        public override void Down()
        {
            DropTable("public.Desserts");
        }
    }
}
