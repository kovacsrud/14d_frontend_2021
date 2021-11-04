const express=require('express');
const app=express();
const Ember=require('./ember');
const cors=require('cors');

let adatok=[];

let ember=new Ember(1,"Ubul",23);
adatok.push(ember);
ember=new Ember(2,"Zénó",29);
adatok.push(ember);

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.listen(8000,()=>{
    console.log("A szerver fut.");
});

app.get('/',(req,res)=>{
    res.send("Hello!");
});

app.get('/ember',(req,res)=>{
    res.json(adatok);
});

app.get('/ember/:id',(req,res)=>{
    let id=req.params.id;
    let ember=adatok.find(x=>x.id==id);
    if(ember!=null) {
        res.json(ember);
    } else {
        res.send("Nincs ilyen ember!");
    }
});

app.post('/ember',(req,res)=>{
    //Itt valósítjuk meg az új adat feldolgozását
   
    
    res.send("Kérés megérkezett");
   
});