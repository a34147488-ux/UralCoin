// ===================================
// URALcoin TOP v10
// Telegram Leaderboard
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



const response =

await fetch(

CONFIG.API_URL +
"/top"

);







if(!response.ok){


throw new Error(
"TOP ERROR"
);


}







let players =

await response.json();








if(

!Array.isArray(players)

||

players.length===0

){



list.innerHTML =

`

<div class="top-empty">

Игроков пока нет

</div>

`;



return;



}









players = players

.sort(

(a,b)=>

Number(b.balance || 0)

-

Number(a.balance || 0)

)

.slice(0,50);









list.innerHTML = "";








players.forEach(

(player,index)=>{





let card =

document.createElement(
"div"
);



card.className =
"top-card";








let avatarHTML;









if(player.photo){



avatarHTML =

`

<img

class="top-avatar-img"

src="${player.photo}"

onerror="this.style.display='none'"

>

`;



}

else{



avatarHTML =

`

<div class="top-avatar">

${

(player.name || "U")

.charAt(0)

.toUpperCase()

}

</div>

`;



}









card.innerHTML =

`

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

${player.invited || player.friends || 0}

</div>



</div>



`;









// профиль игрока по нажатию


card.onclick = ()=>{


showPlayerProfile(player);



};








list.appendChild(card);




}



);






}

catch(error){



console.log(
error
);



list.innerHTML =

`

<div class="top-empty">

Ошибка загрузки топа

</div>

`;



}



}









// ===============================
// PLAYER PROFILE
// ===============================


function showPlayerProfile(player){



let old =

document.getElementById(
"playerProfilePopup"
);



if(old)

old.remove();






let popup =

document.createElement(
"div"
);



popup.id =
"playerProfilePopup";



popup.className =
"profile-popup";








popup.innerHTML =

`

<div class="panel">



<div class="avatar big">



${
player.photo ?

`

<img src="${player.photo}">

`

:

(player.name || "U")

.charAt(0)

}



</div>





<h2>

${player.name || "Игрок"}

</h2>





<p>

Баланс:

${formatTopBalance(player.balance)}

 U

</p>




<p>

Приглашено:

${player.invited || 0}

</p>





<button class="gold-button">

Закрыть

</button>




</div>

`;







document.body.appendChild(
popup
);






popup.querySelector(
"button"
).onclick = ()=>{


popup.remove();


};



}









loadTop();






setInterval(

loadTop,

10000

);
