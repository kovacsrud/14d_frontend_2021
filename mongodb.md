# Mongo DB használata

A MongoDB egy úgynevezett NoSql adatbázis, tehát nem úgy tárolja az adatokat, mint a megszokott relációs adatbázis-kezelő szoftverek. 
A MongoDB olyan adatbázis-kezelő, ami kulcs-érték párokat tárol. Az érték ebben az esetben dokumentumokat, egész pontosan JSON dokumentumokat  jelent. A MongoDB ezeknek a bináris reprezentációját tárolja (BSON). A JSON dokumentumok lehetővé teszik, hogy JS környezetben az adatokat mindenféle átalakítás nélkül kezeljük, kiszolgáljuk. Természetesen más környezetek is gond nélkül tudják használni a JSON formátumú adatokat, hiszen ez egy elterjedt adatcsere formátum is.

A mongoban is értelmezett az adatbázis fogalma, azonban az adatbázis kollekciókat tárol, amit leginkább a relációs adatbázis-kezelés adattáblájának felel meg.
A kollekciók dokumentumokat tárolnak, a dokumentum a relációs adatbázis-kezelés rekordjának felel meg. 
Jelentős különbség, hogy a dokumentumok felépítésére nincs alaphelyzetben kötöttség, de természetesen megoldható, hogy egy dokumentum megfeleljen egy adott sémának. A relációs adatbázisok felépítésére jóval több szabály van (normálformák).

