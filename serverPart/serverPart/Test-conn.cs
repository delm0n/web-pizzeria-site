using Nancy;
using Nancy.Extensions;
using Nancy.ModelBinding;
using serverPart.Data;
using serverPart.Data.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Net;
using System.IO;
using System.Net.Mail;

namespace serverPart
{
    public class Test_conn : NancyModule
    {
        public Test_conn()
        {


            Get["/email", runAsync: true] = async (x, token) =>
            {
                try
                {
                    // отправитель - устанавливаем адрес и отображаемое в письме имя
                    MailAddress from = new MailAddress("delm0n@mail.ru", "delm0n");

                    // кому отправляем
                    MailAddress to = new MailAddress("delm0n@mail.ru");

                    // создаем объект сообщения
                    MailMessage m = new MailMessage(from, to);

                    // тема письма
                    m.Subject = "три письма";
                    m.IsBodyHtml = true;
                    m.Body = "<h2>hello word</h2>";
                    
                    // письмо представляет код html
                    m.IsBodyHtml = true;

                    // адрес smtp-сервера и порт, с которого будем отправлять письмо
                    SmtpClient smtp = new SmtpClient("smtp.mail.ru", 587);

                    // логин и пароль
                    smtp.Credentials = new NetworkCredential("delm0n@mail.ru", "e0LEpm1e731bLGYjvu3Q");
                    smtp.EnableSsl = true;
                    smtp.Send(m);


                    m.Body = "<table><tr><th>Russia</th><th>Great Br</th><th>Europe</th><th>Foot length, cm</th><tr><td>34,5</td><td>3,5</td><td>36</td><td>23</td></tr></table>";
                    smtp.Send(m);

                    m.Body = "";
                    m.Attachments.Add(new Attachment("C://52c8e8114c11cfa9e6e668ee652dbf2b.pdf"));
                    smtp.Send(m);

                    //Console.Read();
                } catch (Exception ex)
                {

                }
                

                return new Response { StatusCode = Nancy.HttpStatusCode.OK };

            };
        }
    }
}
