# XQuery Exercise 2

1 . Count of files in the collection:
```
xquery version "3.1";
count(collection('/db/pokemonMap/pokemon'))
```

2 . To tokenize on the file paths: 
```
collection('/db/pokemonMap/pokemon')//pokemon/tokenize(base-uri(), '/')[last()]
```

3 .

   a. ```collection('/db/pokemonMap/pokemon')/*```
   
   b.  The element and attribute that hold the type is ```<typing type="">```
   
   c.  The element and attribute that hold the location is ```<locations> <landmark n=""> </landmark> </locations>```
   
   d. If we started from the element holding the type and moved to the name, we would use the sibling axis, because they share an ancestor.
   
   e. If we started from the landmark element and wanted to find the type, you would use the ancestor axis.
   
   
 4 . 
 
 a. Pokemon types: 
 ```
 let $types :=collection('/db/pokemonMap/pokemon')//typing/@type/string()
return $types
```

b. To separate the individual values: 
```
let $types :=collection('/db/pokemonMap/pokemon')//typing/string(@type)
for $t in $types
return tokenize($t, '\s')
```

c. To remove duplicates and find only the distinct types that are available: 
```
let $coll := collection('/db/pokemonMap/pokemon')
let $pokemon :=$coll//pokemon
let $types :=$pokemon//typing/@type ! tokenize(string(), '\s')
let $distinct := distinct-values($types)
return $distinct
```

d. 
```
xquery version "3.1";
(:  :collection('/db/pokemonMap/pokemon')/*:)

let $coll := collection('/db/pokemonMap/pokemon')
let $pokemon :=$coll//pokemon
let $types :=$pokemon//typing/@type ! tokenize(string(), '\s') ! tokenize(string(), ',')[1] => sort()
let $distinct := distinct-values($types)
return $distinct
```


5. 
a. 

b. xquery version "3.1";
(:  :collection('/db/pokemonMap/pokemon')/*:)

let $coll := collection('/db/pokemonMap/pokemon')
let $pokemon :=$coll//pokemon
let $types :=$pokemon//typing/@type ! tokenize(string(), '\s') ! tokenize(string(), ',')[1] => sort()
let $distinct := distinct-values($types)
for $d in $distinct
let $landmarks := $pokemon//locations/landmark

c.  
```
let $coll := collection('/db/pokemonMap/pokemon')
let $pokemon :=$coll//pokemon
let $types :=$pokemon//typing/@type ! tokenize(string(), '\s') ! tokenize(string(), ',')[1] => sort()
let $distinct := distinct-values($types)
for $d in $distinct
let $landmarks := $pokemon//locations/landmark
let $dLandmark := $landmarks[preceding::typing/@type/string() = $d]
return $dLandmark
```

This is how we ended up finalizing and refining this search: 
```
let $coll := collection('/db/pokemonMap/pokemon')
let $pokemon :=$coll//pokemon
let $types :=$pokemon//typing/@type ! tokenize(string(), '\s') ! tokenize(string(), ',')[1] => sort()
let $distinct := distinct-values($types)
for $d in $distinct
let $landmarks := $pokemon//locations/landmark
let $dLandmark := $landmarks[preceding::typing/@type/string() = $d] ! text() ! normalize-space()
let $distLands := distinct-values($dLandmark)
return ($d, $distLands)
```

6. For my final HTML table: 

```
xquery version "3.1";
    <html>
        <head> <title>Pokemon Types and Locations</title></head>
        
        <body>
        <table>
        
        {
let $coll := collection('/db/pokemonMap/pokemon')
let $pokemon :=$coll//pokemon
let $types :=$pokemon//typing/@type ! tokenize(string(), '\s') ! tokenize(string(), ',')[1] => sort()
let $distinct := distinct-values($types)
for $d in $distinct
let $landmarks := $pokemon//locations/landmark
let $dLandmark := $landmarks[preceding::typing/@type/string() = $d] ! text() ! normalize-space()
let $distLands := distinct-values($dLandmark)
return
            <tr>
                <td>{$d}</td>
                <td>{string-join($distLands, ',')}</td>
            </tr>
                
        }    
        </table>    
        </body>
    </html>
```

There are certain steps in here that I didn't list (which were mostly just messing around with concat() and different ways of formatting the results).