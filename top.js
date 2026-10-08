// ===================================
// URALcoin TOP v10
// Server Leaderboard
// ===================================



function formatTopBalance(value){


return Number(value || 0)

.toFixed(3)

.replace(".",",");



}









async function loadTop(){



const list =

document.getElementById(
"topList"
);





if(!list)

return;







try{



const response = await fetch(

CONFIG.API_URL +

"/top"

);







const players = await response.json();







if(

!Array.isArray(players)

||

players.length===0

){



list.innerHTML = `

<div class="top-empty">

Игроков пока нет

</div>

`;



return;



}








list.innerHTML="";








players.forEach(

(player,index)=>{





const card =

document.createElement(
"div"
);





card.className =
"top-card";







let avatarHTML = "";








if(player.photo){



avatarHTML = `

<img

class="top-avatar-img"

src="${player.photo}"

onerror="this.style.display='none'"

>

`;



}

else{



avatarHTML = `

<div class="top-avatar">

${

(player.name || "U")

.charAt(0)

.toUpperCase()

}

</div>

`;



}









card.innerHTML = `



<div class="top-position">

${index+1}

</div>





${avatarHTML}







<div class="top-data">



<div class="top-name">

${player.name || "Игрок"}

</div>





<div class="top-balance">

${formatTopBalance(player.balance)}

 U

</div>





<div class="top-friends">

Приглашено:

${player.invited || 0}

</div>





</div>



`;







list.appendChild(card);





}

);







}

catch(error){



console.log(
"TOP ERROR",
error
);



list.innerHTML = `

<div class="top-empty">

Ошибка загрузки

</div>

`;



}



}









loadTop();







setInterval(

loadTop,

10000

);
