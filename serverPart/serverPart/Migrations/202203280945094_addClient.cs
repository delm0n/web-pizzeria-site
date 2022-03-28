namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addClient : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "public.Clients",
                c => new
                    {
                        ClientId = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        Telephone = c.String(),
                        Password = c.String(),
                    })
                .PrimaryKey(t => t.ClientId);
            
        }
        
        public override void Down()
        {
            DropTable("public.Clients");
        }
    }
}
