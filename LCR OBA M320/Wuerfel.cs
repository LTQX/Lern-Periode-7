using System;
namespace LCR_OBA_M320
{

}
public class Wuerfel
{
    private const int MAX_NUMMER = 6;
    private Random _random;

    public Wuerfel()
    {
        _random = new Random();
    }

    public int Wuerfle()
    {
        return _random.Next(1, MAX_NUMMER + 1);
    }
}