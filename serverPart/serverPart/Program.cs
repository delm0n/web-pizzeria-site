using Nancy.Hosting.Self;
using serverPart.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace serverPart
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var uri = new Uri("http://localhost:1234");

            HostConfiguration hostConfiguration = new HostConfiguration();
            hostConfiguration.UrlReservations.CreateAutomatically = true;


            using (var host = new NancyHost(hostConfiguration, uri))
            {
                host.Start();

                Console.WriteLine("Your application is running on " + uri);
                Console.WriteLine("Press any [Enter] to close the host.");
                Console.ReadLine();
            }
        }
    }
}
