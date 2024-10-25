public class Spieler
{
    public string Name { get; private set; }
    private int _chips;

    public Spieler(string name)
    {
        Name = name;
        _chips = 3;
    }

    public int Chips => _chips;

    public int AnzahlWuerfel()
    {
        return Math.Min(_chips, 3);
    }

    public void ErhalteChip()
    {
        _chips++;
    }

    public void GebeChipAb()
    {
        if (_chips > 0)
            _chips--;
    }
}