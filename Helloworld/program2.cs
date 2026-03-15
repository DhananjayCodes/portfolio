using System;

class Program
{
    static void Main()
    {
        // Create a random number between 1 and 100
        Random random = new Random();
        int secretNumber = random.Next(1, 101); // Upper bound is exclusive
        int guess = 0;
        int attempts = 0;

        Console.WriteLine("🎯 Welcome to the Number Guessing Game!");
        Console.WriteLine("I have picked a number between 1 and 100. Can you guess it?");

        // Loop until the user guesses correctly
        while (guess != secretNumber)
        {
            Console.Write("Enter your guess: ");
            string input = Console.ReadLine();

            // Validate input
            if (!int.TryParse(input, out guess) || guess < 1 || guess > 100)
            {
                Console.WriteLine("❌ Please enter a valid number between 1 and 100.");
                continue;
            }

            attempts++;

            if (guess < secretNumber)
            {
                Console.WriteLine("📉 Too low! Try again.");
            }
            else if (guess > secretNumber)
            {
                Console.WriteLine("📈 Too high! Try again.");
            }
            else
            {
                Console.WriteLine($"✅ Congratulations! You guessed it in {attempts} attempts.");
            }
        }
    }
}
