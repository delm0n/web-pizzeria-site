using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace serverPart.Data.Entity
{
    public class Client
    {
        public int ClientId { get; set; }

        public string FirstName { get; set; } //имя   

        public string Telephone { get; set; }

        public string Password { get; set; }

        //public ICollection<Order> Orders { get; set; }
        
        
    }
}
