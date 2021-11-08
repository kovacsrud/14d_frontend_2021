const express=require('express');
const app=express();
const sqlite3=require('sqlite3');
const cors=require('cors');
const {db_all}=require('./dbfunc');
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

app.get('/alldata',(req,res)=>{
    /*try{
        const data=await db_all(db);
        res.json(data);
        console.log(data);

    } catch(e){
        res.send("Hiba"+e);
    }*/
    res.send("g");
    
});

app.get('/alldata2',(req,res)=>{
    db.all("select * from autok",(error,rows)=>{
        if(error){
            res.send(error);
        } else {
            res.json(rows);
        }

    });
});

app.post('/ujauto',(req,res)=>{
    var rendszam=req.body.rendszam;
    var marka=req.body.marka;
    var tipus=req.body.tipus;
    var szin=req.body.szin;
    var gyartasiev=req.body.gyartasiev;
    db.run("insert into autok values(?,?,?,?,?)",
    [rendszam,
    marka,
    tipus,
    szin,
    gyartasiev],
    error=>{
        if(error){
            res.send(error);
        } else {
            res.status(200).json({status:"Ok",message:'Adatok beszúrva'});
        }
    });
});