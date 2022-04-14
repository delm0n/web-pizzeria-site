using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace serverPart
{
    public class PersonalToken
    {
        static string token = "";

        public static void setToken( string token_ )
        {
            token = token_;
        }

        public static string getToken()
        {
            return token;
        }
    }
}
