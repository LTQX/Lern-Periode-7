using System;
using System.Collections.Generic;

public class GUI
{
    public static void FrageSpielerEingabe(List<Spieler> spielerList)
    {
        bool weitereSpieler = true;
        while (weitereSpieler)
        {
            Console.WriteLine("Möchten Sie einen Spieler hinzufügen? 1 für Ja, 2 für Nein:");
            string choice = Console.ReadLine();

            if (choice == "1")
            {
                Console.Write("Geben Sie den Namen des Spielers ein: ");
                string playerName = Console.ReadLine();
                spielerList.Add(new Spieler(playerName));
            }
            else if (choice == "2")
            {
                if (spielerList.Count >= 3)
                {
                    weitereSpieler = false;
                }
                else
                {
                    Console.WriteLine("Mindestens 3 Spieler müssen hinzugefügt werden.");
                }
            }
            else
            {
                Console.WriteLine("Ungültige Eingabe.");
            }
        }
    }

    public static void PrintRangliste(List<Spieler> spielerList)
    {
        Console.WriteLine("Aktueller Chip-Stand:");
        foreach (var spieler in spielerList)
        {
            Console.WriteLine($"{spieler.Name}: {spieler.Chips} Chips");
        }
    }

    public static void PrintGewinner(List<Spieler> spielerList)
    {
        foreach (var spieler in spielerList)
        {
            if (spieler.Chips > 0)
            {
                Console.WriteLine($"Der Gewinner ist {spieler.Name} mit {spieler.Chips} Chips!");
                break;
            }
        }
    }
}