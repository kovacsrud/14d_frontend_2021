# Mongo DB használata

A MongoDB egy úgynevezett NoSql adatbázis, tehát nem úgy tárolja az adatokat, mint a megszokott relációs adatbázis-kezelő szoftverek. 
A MongoDB olyan adatbázis-kezelő, ami kulcs-érték párokat tárol. Az érték ebben az esetben dokumentumokat, egész pontosan JSON dokumentumokat  jelent. A MongoDB ezeknek a bináris reprezentációját tárolja (BSON). A JSON dokumentumok lehetővé teszik, hogy JS környezetben az adatokat mindenféle átalakítás nélkül kezeljük, kiszolgáljuk. Természetesen más környezetek is gond nélkül tudják használni a JSON formátumú adatokat, hiszen ez egy elterjedt adatcsere formátum is.

A mongoban is értelmezett az adatbázis fogalma, azonban az adatbázis kollekciókat tárol, amit leginkább a relációs adatbázis-kezelés adattáblájának felel meg.
A kollekciók dokumentumokat tárolnak, a dokumentum a relációs adatbázis-kezelés rekordjának felel meg. 
Jelentős különbség, hogy a dokumentumok felépítésére nincs alaphelyzetben kötöttség, de természetesen megoldható, hogy egy dokumentum megfeleljen egy adott sémának. A relációs adatbázisok felépítésére jóval több szabály van (normálformák).

## Lekérdezés, adatszűrés

A Compass programban van lehetőség az adatok lekérdezésére, szűrésére. A filter sorba kell beírni a szűrési kifejezést:

Kérdezzük le a Ford autók adatait:
```mongodb
{gyartmany:"Ford"}
```
Beágyazott objektum mezőjének elérése:
```mongodb
{"forgalmi.sorszam":12234566}
```
Szám típusoknál összehasonlító műveletek(ahol a gyartasiev >=2007 és <=2010
```
{gyartasiev:{$gte:2007,$lte:2010}}
```
Az összehasonlító operátorok:
 - $lte - lower than or equal
 - $lt -lower than
 - $gte - greater than or equal
 - $gt - greater than
 - $eq - eqal
 - $ne - not equal
 - $in - eleme-e egy tömbnek
 - $nin - not in (nem eleme egy tömbnek)

## Reguláris kifejezések

A reguláris kifejezések szövegekben való keresésre szolgálnak. Szinte minden nyelv implementálja ezeket, itt is használhatóak azokra a keresési feladatokra, amelyeket SQL-ben a **like** függvénnyel lehet megoldani.
