# kasuNhentaiCS.Json
## **Usage**
```cs
using kasuNhentaiCS.Json; // Always include this

class Program
{
    static void Main()
    {
        List<dynamic> strArr = new List<dynamic>
        {
            "array 1",
            new{
                pbke = "array on object"
            },
            new{
                pbke = 123
            }
        };

        var sampleObject = new
        {
            _string = "string 1",
            _object = new
            {
                _string = "string 2"
            },
            StringArray = strArr
        };

        var serialized = JsonSerializer.Serialize(sampleObject);
        var Data = new JsonDeserializer(serialized);

        Data.selector("_string");             // output: "string 1"                        -> string
        Data.selector("_object");             // output: "{data = [object]}"               -> object
        Data.selector("_object>_string");     // output: "string 2"                        -> string
        Data.selector("StringArray:1>pbke");  // output: "{data = [array], count = [int]}" -> object
        Data.selector("StringArray:1>pbke");  // output: "array on object"                 -> string
        Data.selector("StringArray:2>pbke");  // output: "123"                             -> int32
    }
}
```