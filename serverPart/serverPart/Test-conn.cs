using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace serverPart
{
    public class Test_conn : NancyModule
    {
        public Test_conn()
        {
            Get["/testconn"] = x => {
                return Response.AsJson("testing axios in angular");
                //return string.Concat("testing axios in angular");
            };
        }
    }
}
