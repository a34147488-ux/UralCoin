// =================================
// URALcoin TOP v13.2
// PLAYERS RATING
// =================================



async function loadTop(){



const box =

document.getElementById(
"topList"
);





if(!box)

return;






try{



if(!CONFIG.API_URL){



box.innerHTML =
`
<div class="top-card">
Топ пока пуст
</div>
`;



return;

}





const response = await fetch(

CONFIG.API_URL+
"/top"

);






const data = await response.json();






let players =

data.players || data || [];







if(!players.length){



box.innerHTML =
`
<div class="top-card">
Игроков пока нет
</div>
`;



return;



}








players.sort((a,b)=>{


return Number(b.balance||0)

-

Number(a.balance||0);


});









box.innerHTML="";








players.slice(0,50)

.forEach((p,index)=>{





let avatar =

p.photo ||

"";







let image = avatar ?



`
<img src="${avatar}">
`

:

`
<div class="top-avatar">

${

(p.name||"U")
.charAt(0)

}

</div>

`;









box.innerHTML +=



`

<div class="top-card">


<div class="place">

#${index+1}

</div>



${image}



<div class="top-info">


<b>

${p.name || "Игрок"}

</b>



<div class="top-balance">

${formatNumber(p.balance)} U

</div>



</div>



</div>


`;




});






}

catch(error){



console.log(
"TOP ERROR",
error
);





box.innerHTML =
`
<div class="top-card">

Топ временно недоступен

</div>
`;



}



}










// обновление каждые 30 секунд

setInterval(

loadTop,

30000

);







loadTop();
