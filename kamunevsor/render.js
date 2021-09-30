let root=document.getElementById('root')

root.setAttribute('style','display:flex;flex-wrap:wrap')


for(i=0;i<adatok.length;i++){
    let emberDiv=document.createElement('div')
    emberDiv.setAttribute('style','margin:10px;padding:10px;background-color:aqua')
    let emberNev=document.createElement('p')
    let emberLista=document.createElement('ul')
    let emberLakhely=document.createElement('li')
    let emberEletkor=document.createElement('li')
    let emberKep=document.createElement('img')

    emberNev.textContent=adatok[i].nev
    emberLakhely.textContent=adatok[i].lakhely
    emberEletkor.textContent=adatok[i].eletkor
    emberKep.src=adatok[i].foto
    emberKep.width=100

    emberLista.appendChild(emberLakhely)
    emberLista.appendChild(emberEletkor)

    emberDiv.appendChild(emberNev)
    emberDiv.appendChild(emberLista)
    emberDiv.appendChild(emberKep)

    root.appendChild(emberDiv)

}

