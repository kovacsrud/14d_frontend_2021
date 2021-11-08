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
