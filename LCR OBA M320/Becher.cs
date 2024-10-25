using System;
using System.Collections.Generic;

public class Becher
{
    private Wuerfel _wuerfel;

    public Becher()
    {
        _wuerfel = new Wuerfel();
    }

    public List<int> Schuettle(int anzahl)
    {
        List<int> zahlen = new List<int>();
        for (int i = 0; i < anzahl; i++)
        {
            zahlen.Add(_wuerfel.Wuerfle());
        }
        return zahlen;
    }
}