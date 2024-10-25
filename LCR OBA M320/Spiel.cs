using System;
namespace LCR_OBA_M320
{

}

public class Spiel
{
    private List<Spieler> _spielerList;
    private Spieler _aktuellerSpieler;
    private Becher _becher;

    public Spiel()
    {
        _spielerList = new List<Spieler>();
        _becher = new Becher();
        GUI.FrageSpielerEingabe(_spielerList); 
        SetzeStartSpieler();
    }

    private void SetzeStartSpieler()
    {
        Random rand = new Random();
        int startIndex = rand.Next(_spielerList.Count);
        _aktuellerSpieler = _spielerList[startIndex];
        Console.WriteLine($"Der Startspieler ist {_aktuellerSpieler.Name}");
    }

    private Spieler SpielerRechtsVonAktuellemSpieler()
    {
        int index = (_spielerList.IndexOf(_aktuellerSpieler) + 1) % _spielerList.Count;
        return _spielerList[index];
    }

    private Spieler SpielerLinksVonAktuellemSpieler()
    {
        int index = (_spielerList.IndexOf(_aktuellerSpieler) - 1 + _spielerList.Count) % _spielerList.Count;
        return _spielerList[index];
    }

    private bool MehrAlsEinSpielerHatChips()
    {
        int count = 0;
        foreach (var spieler in _spielerList)
        {
            if (spieler.Chips > 0) count++;
        }
        return count > 1;
    }

    private void GewuerfelteZahlenVerarbeiten(List<int> zahlen)
    {
        foreach (var zahl in zahlen)
        {
            if (zahl == 4)
                ChipNachLinksWeitergeben();
            else if (zahl == 5)
                ChipNachRechtsWeitergeben();
            else if (zahl == 6)
                ChipInDieMitteLegen();
        }
    }

    private void ChipNachLinksWeitergeben()
    {
        Spieler links = SpielerLinksVonAktuellemSpieler();
        _aktuellerSpieler.GebeChipAb();
        links.ErhalteChip();
        Console.WriteLine($"{_aktuellerSpieler.Name} gibt einen Chip nach links an {links.Name}");
    }

    private void ChipNachRechtsWeitergeben()
    {
        Spieler rechts = SpielerRechtsVonAktuellemSpieler();
        _aktuellerSpieler.GebeChipAb();
        rechts.ErhalteChip();
        Console.WriteLine($"{_aktuellerSpieler.Name} gibt einen Chip nach rechts an {rechts.Name}");
    }

    private void ChipInDieMitteLegen()
    {
        _aktuellerSpieler.GebeChipAb();
        Console.WriteLine($"{_aktuellerSpieler.Name} legt einen Chip in die Mitte.");
    }

    public void Spielen()
    {
        while (MehrAlsEinSpielerHatChips())
        {
            Console.WriteLine($"Spieler {_aktuellerSpieler.Name} ist an der Reihe.");
            int wuerfelAnzahl = _aktuellerSpieler.AnzahlWuerfel();
            List<int> gewuerfelteZahlen = _becher.Schuettle(wuerfelAnzahl);
            GewuerfelteZahlenVerarbeiten(gewuerfelteZahlen);

            _aktuellerSpieler = SpielerRechtsVonAktuellemSpieler();
            GUI.PrintRangliste(_spielerList);
        }

        GUI.PrintGewinner(_spielerList);
    }
}