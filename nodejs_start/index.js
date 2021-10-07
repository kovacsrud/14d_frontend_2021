console.log("Hello");
const express=require('express');
const app=express()

app.set('view-engine','ejs');
app.listen(8000,()=>{console.log("A szerver fut")})


app.get('/',(req,res)=>{
    res.send("Hello, node szerver vagyok");
})

app.get('/info',(req,res)=>{
    res.send("Info oldal");
})

app.get('/minta',(req,res)=>{
    res.render('minta.ejs',{nev:"Valaki,bárki,akárki"});
})
