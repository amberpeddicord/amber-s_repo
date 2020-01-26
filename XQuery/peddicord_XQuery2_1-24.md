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

c. 