namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updpizzaandpizzasize : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Pizzas", "Structure", c => c.String());
            AddColumn("public.PizzaSizes", "NameSize", c => c.String());
            DropColumn("public.PizzaSizes", "Name");
        }
        
        public override void Down()
        {
            AddColumn("public.PizzaSizes", "Name", c => c.String());
            DropColumn("public.PizzaSizes", "NameSize");
            DropColumn("public.Pizzas", "Structure");
        }
    }
}
