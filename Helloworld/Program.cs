using System;
using System.Security.Cryptography;

namespace Hello
{
    class Program
    {
        static void Main(string[] args)
        {
            //This is a simple c# program.
            /*
            hello i am a begiiner learning to be a software developer
            i love coding and programming 
            i hope to be great developer one day
            */
            int dj = 21; //integer variable
            /*Data types in c#:
            integer - int dj; --> 4 byes
            floating point number - float that; --> 4 bytes
            character - char a = A'; --> 2 Bytes
            boolean - dj is Great = true; --> 1 bit
            String = string inp = "Dj"; --> 2 btes per character
            */
            string inp = Console.ReadLine();
            Console.WriteLine(inp);
            //Console.Write("Hello World");
            //Console.WriteLine(" i love programming");
            //Console.WriteLine("This is a simple C# program." + dj);
            Console.ReadLine();
        }
    }
}
