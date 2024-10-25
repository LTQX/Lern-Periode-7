using System;
namespace LCR_OBA_M320
{
	public class Program
	{
		public static void Main(string[] args)
		{
			Spiel spiel = new Spiel();
			spiel.Spielen();

			Console.WriteLine("Spiel beendet. Drücken Sie eine beliebige Taste zum Beenden.");
			Console.ReadKey();
		} 
		
	}
}

