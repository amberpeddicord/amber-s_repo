#XQuery 1

1. 
``` 
declare default element namespace "http://www.tei-c.org/ns/1.0";
    collection('/db/apps/shakespeare/data/')//titleStmt/title   
```


2. 
```
declare default element namespace "http://www.tei-c.org/ns/1.0";
collection('/db/apps/shakespeare/data/')//titleStmt/title/text()
```

3. 
```
declare default element namespace "http://www.tei-c.org/ns/1.0";
collection('/db/apps/shakespeare/data/')//TEI
```

4. The plays are: Love's Labour's Lost and The Tempest

```
declare default element namespace "http://www.tei-c.org/ns/1.0";
collection('/db/apps/shakespeare/data/')//TEI[.//speaker[text() = 'Ferdinand']]
```

5. 
```
declare default element namespace "http://www.tei-c.org/ns/1.0";
collection('/db/apps/shakespeare/data/')//TEI[.//speaker[text() = 'Ferdinand']]//titleStmt/title
```

6. 
```
xquery version "3.1";
declare default element namespace "http://www.tei-c.org/ns/1.0";

let $coll :=collection('/db/apps/shakespeare/data')
let $plays :=$coll//TEI
for $p in $plays
let $pSpeaker :=$p//sp//@who
let $title :=$p//titleStmt/title
let $distinct-values :=distinct-values($pSpeaker)
let $count :=count($distinct-values)
where $count gt 58
return $title
```

7. For just the text of the previous titles: 
```
xquery version "3.1";
declare default element namespace "http://www.tei-c.org/ns/1.0";

let $coll :=collection('/db/apps/shakespeare/data')
let $plays :=$coll//TEI
for $p in $plays
let $pSpeaker :=$p//sp//@who
let $title :=$p//titleStmt/title
let $distinct-values :=distinct-values($pSpeaker)
let $count :=count($distinct-values)
where $count gt 58
return $title/text()
```

To add base-uri(), I used this code:

```
xquery version "3.1";
declare default element namespace "http://www.tei-c.org/ns/1.0";

let $coll :=collection('/db/apps/shakespeare/data')
let $plays :=$coll//TEI
for $p in $plays
let $pSpeaker :=$p//sp//@who
let $title :=$p//titleStmt/title
let $distinct-values :=distinct-values($pSpeaker)
let $count :=count($distinct-values)
where $count gt 58
return base-uri($p)
```

This showed me the file names of the files of plays that contained over 58 distinct speakers. 

When using tokenize(), I had a little trouble, and the results weren't what I expected! I got 18 results rather than just 
8. This was my code: 

```
xquery version "3.1";
declare default element namespace "http://www.tei-c.org/ns/1.0";

let $coll :=collection('/db/apps/shakespeare/data')
let $plays :=$coll//TEI
for $p in $plays
let $pSpeaker :=$p//sp//@who
let $title :=$p//titleStmt/title
let $distinct-values :=distinct-values($pSpeaker)
let $count :=count($distinct-values)
where $count gt 58
return tokenize(base-uri($p) , "/")
```

9. Because I used a FLWOR expression, I wrote the expression as a long Xpath expression: 

```
xquery version "3.1";
declare default element namespace "http://www.tei-c.org/ns/1.0";

collection('/db/apps/shakespeare/data')//TEI[count(distinct-values(descendant::sp/@who)) gt 58]//titleStmt/title
```
