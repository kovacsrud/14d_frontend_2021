import { useState,useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import List from './components/List';

function App() {
  const [idoAdatok,setIdoAdatok]=useState([]);
  const ev=2011;

  useEffect(()=>{
    fetch(`http://127.0.0.1:8000/ev/${ev}`)
    .then(res=>res.json())
    .then(adatok=>setIdoAdatok(adatok))
    .catch(err=>console.log(err));
  },[]);

  return (
    <div className="container">
      
      <section className="bg-dark text-white">
      <Header oldalCim={'Időjárás frontend'} />
      </section>
      <p>Adatok száma:{idoAdatok.length}</p>
      
      <List lista={idoAdatok} />
      
    </div>
  );
}

export default App;
