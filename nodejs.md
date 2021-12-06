# Node.js ismeretek

Ha röviden meg kellene határozni, hogy mit is a Node.js, akkor talán azt lehet mondani, hogy lehetőség arra, hogy a szerver oldalon Javascript kódot futtassunk. Tehát tulajdonképpen egy futtató környezetről van szó.

Fontosabb tulajdonságai:
 - tud bináris adatokat kezelni
 - hozzáfér fájlrendszerhez, hálózathoz, processzekhez, socketekhez, streamekhez
 - futtathatunk más programokat
 - egy szálon fut
 - kevés memóriát használ jól megírt programok esetén
 - eseményvezérelt
 - nem blokkoló I/O műveletek
 - ha webszervert akarunk, meg kell írni

Mire érdemes használni?
 - fejlesztői segédalkalmazások
 - stream szerver
 - API kiszolgálás
 - Live alkalmazások, pl. chat
 - jól használható MongoDB-vel
 - gyors

Mire nem érdemes használni?
 - nagy számítási igényű műveletekhez
 - többszálú, nagy terhelést elbíró rendszerekhez nem jó
 
 ## A Node Package Manager
 
 A Node.JS Windows alá végtelenül egyszerűen telepíthető, és telepítést követően már használható is. Azonban az alap rendszer "csupasz", ezért az egyes feladatokhoz számos csomagot kell majd telepíteni. A csomagok kezelését az NPM (Node Package Manager) segítségével végezzük.
 
Hozzunk létre egy node projektet!

Először hozzunk létre egy mappát, amely a projekt mappája lesz.
Indítsuk el a Visual Studio Code-ot.
Nyissunk egy terminált, lépjünk be az előbb létrehozott mappába.
Adjuk ki a következő parancsot:
```javascript
npm init -y
```
A -y hatására nem tesz fel kérdéseket az init, úgy veszi, hogy mindenre yes-t válaszoltunk. 

Létrejön egy package.json nevű fájl amely a projekt konfigurációját tartalmazza.
Hozzunk létre egy **index.js** nevú fájlt, és írjuk bele: **console.log("Node projekt")**

Próbáljuk futtatni az **npm start** paranccsal.
Hibát kapunk. Azért kapunk hibát, mert a konfigurációban nincsen megadva start script. A **scripts** részbe írjuk be:
```js
 "start":"node index.js"
```
Ezek után az npm start parancsot futtatva már megy a script.

**Telepítés**

Számos csomagot lehet telepíteni nodejs alá, melyekkel megkönnyíthető a fejlesztés.
Szerverhez, különböző kiszolgáló tevékenységekhez az egyik legjobb az Express.
Telepítése: 
```js
npm install express
```
Egy végtelenül egyszerű express kiszolgáló létrehozása:
```js
const express=require('express');
const app=express();

app.listen(8000,()=>{console.log("A szerver fut")})

app.get('/',(req,res)=>{
    res.send("Hello, node szerver vagyok");
})
```
Amennyiben a start script jól van beállítva, az **npm start** paranccsal a szerver elindul.

Ha le kell állítani, akkor a CTRL+C paranccsal leállítható. Látszik, hogy fejlesztés közben, ha módosul a programunk, akkor a változtatások során le kell állítani, majd újra el kell indítani a szervert. Ez eléggé kényelmetlen, ezért érdemes feltelepíteni a **nodemon**-t.
A telepítés parancsa:
```js
npm install --save-dev nodemon
```
A telepítés után a package.json-ban módosítsuk a start scriptet a következőre:
```js
 "start":"nodemon index.js"
```
A nodemon minden esetben újraindítja a szerverünket, amikor módosítunk a kódon(és mentjük).

## Rest (RESTful) API műveletek
 - GET (adatok lekérése)
 - POST (új adat felvitele)
 - PUT (adat módosítás)
 - PATCH (adat módosítás)
 - DELETE (adat törlése)

Egy API készítése során ezeket a műveleteket kell részben, vagy egészben megvalósítani.

## API építése Sqlite adatbázis háttérrel

A korábbi példák segítségével már láthatóvá vált, hogy hogyan néz ki egy API, azonban ott az adatbázist egy Javascript tömbbel helyettesítettük. Használjunk adatbázist, kezdetnek Sqlite-ot. 

Hozzunk létre egy node projektet:
```js
npm init -y
```
Telepítsük a szükséges szoftvereket:
Express a kiszolgáláshoz:
```js
npm install express
```
Cors, hogy cross-origin kérések is rendben menjenek.
```js
npm install cors
```
Nodemon, hogy ne kézzel kelljen újraindítgatni a szervert
```js
npm install --save-dev nodemon
```
Sqlite 3
```js
npm install sqlite3
```
Cross-fetch
```js
npm install --save cross-fetch
```
A kiinduló konfigurációja a szervernek:
```js
const express=require('express');
const cors=require('cors');
const app=express();
const sqlite3=require('sqlite3');
const  db_alldata  = require('./dbfunc');
const db=new sqlite3.Database('./autok.db');

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.listen(8000,()=>{console.log('A szerver fut')});

app.get('/',(req,res)=>{
    res.send('Autók adatbázis');
});
```
### SQL lekérdezés
```js
app.get('/alldata2',(req,res)=>{
    db.all("select * from autok",(error,rows)=>{
        if(error){
            res.send(error);
        } else {
            res.json(rows);
        }

    });
});
```
### Új adat felvitele
```js
app.post('/ujauto',(req,res)=>{
    db_repo.db_insert(db,req.body)
    .then(eredmeny=>{res.status(200).json(eredmeny)})
    .catch(error=>{res.send(error)});
});
```

### Kliens js az új adat elküldéséhez
```js
const fetch=require('cross-fetch');

let ujauto={
    rendszam:"zqk-630",
    marka:"Opel",
    tipus:"Corsa",
    szin:"zöld",
    gyartasiev:2006
}

async function ujadat(){

    const res=await fetch('http://127.0.0.1:8000/ujauto',{
        method:'post',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(ujauto)
    });

    const valasz=await res.json();

    console.log(valasz);

}


ujadat();

```
## Teljes funkcionalitású API
Azért, hogy ne a végpontoknál szerepeljenek az adatbázis műveletek, ezért külön fájlba tesszük őket. Az adatbázis műveletek Promise-ba ágyazva futnak, hogy aszinkron módon is használhassuk őket.
```js
module.exports.db_all=function(db){
    return new Promise((reject,resolve)=>{
        db.all("select * from autok",(error,rows)=>{
            if(error){
                reject("Error:"+error);
            }
            else {
                resolve(rows);
            }

        });
    });
}

module.exports.db_insert=function(db,{rendszam,marka,tipus,szin,gyartasiev}){
    return new Promise((reject,resolve)=>{
        db.run("insert into autok values(?,?,?,?,?)",[rendszam,marka,tipus,szin,gyartasiev],error=>{
            if(error){
                reject(error);
            } else {
                resolve({status:"Ok",message:"Adat beillesztve"});
            }
        });
    });

}

module.exports.db_update=function(db,{rendszam,marka,tipus,szin,gyartasiev}){
    return new Promise((reject,resolve)=>{
        db.run("update autok set marka=?,tipus=?,szin=?,gyartasiev=? where rendszam=?",[marka,tipus,szin,gyartasiev,rendszam],error=>{
            if(error){
                reject(error);
            } else {
                resolve({status:"Ok",message:"Adat módosítva"});
            }
        });
    });
}

module.exports.db_delete=function(db,{rendszam}){
    return new Promise((reject,resolve)=>{
        db.run("delete from autok where rendszam=?",[rendszam],error=>{
            if(error){
                reject(error);
            } else {
                resolve({status:"Ok",message:"Adat törölve"});
            }
          
        });
    })
    
}
```
### Az index.js így fog kinézni, látható, hogy a végpontoknál csak a promise-okat kell meghívni.
```js
const express=require('express');
const app=express();
const sqlite3=require('sqlite3');
const cors=require('cors');
const db_repo=require('./dbfunc');
const db=new sqlite3.Database('./autok.db');

 
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.listen(8000,()=>{
    console.log("Fut a szerver");
});

app.get('/',(req,res)=>{
    res.send("Autók adatbázis");
});

app.get('/alldata',async(req,res)=>{
    
    db_repo.db_all(db)
    .then(eredmeny=>{res.json(eredmeny)})
    .catch(error=>{res.send(error)});
    
});


app.post('/ujauto',async (req,res)=>{
    
    db_repo.db_insert(db,req.body)
    .then(eredmeny=>{res.status(200).json(eredmeny)})
    .catch(error=>{res.send(error)});
           
        
});

app.put('/updateauto',async (req,res)=>{

    db_repo.db_update(db,req.body)
    .then(eredmeny=>{res.status(200).json(eredmeny)})
    .catch(error=>{res.send(error)});

});

app.delete('/deleteauto',async(req,res)=>{

    db_repo.db_delete(db,req.body)
    .then(eredmeny=>{res.status(200).json(eredmeny)})
    .catch(error=>{res.send(error)});
});
```
### A kliens:
```js
const fetch=require('cross-fetch');

let ujauto={
    rendszam:"zqk-699",
    marka:"Opel",
    tipus:"Corsa",
    szin:"zöld",
    gyartasiev:2006
}

let updateauto={
    rendszam:"zqk-699",
    marka:"Volkswagen",
    tipus:"Touran",
    szin:"szürke",
    gyartasiev:2009
}

async function ujadat(){

    const res=await fetch('http://127.0.0.1:8000/ujauto',{
        method:'post',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(ujauto)
    });

    const valasz=await res.json();

    console.log(valasz);

}

async function updateadat(){

    const res=await fetch('http://127.0.0.1:8000/updateauto',{
        method:'put',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(updateauto)
    });

    const valasz=await res.json();

    console.log(valasz);

}

async function deleteadat(){

    const res=await fetch('http://127.0.0.1:8000/deleteauto',{
        method:'delete',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(updateauto)
    });

    const valasz=await res.json();

    console.log(valasz);

}

//ujadat();
//updateadat();
deleteadat();
```
