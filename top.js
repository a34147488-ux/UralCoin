// ===================================
// URALcoin TOP v4
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

CONFIG.API_URL + "/top"

);







if(!response.ok){



throw new Error(

"Server error"

);



}






let players = await response.json();






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



const card =

document.createElement(

"div"

);





card.className =

"top-card";







let avatar;



if(player.photo){



avatar = `

<img

class="top-avatar-img"

src="${player.photo}"

>

`;



}

else{



avatar = `

<div class="top-avatar">

${index + 1}

</div>

`;



}








card.innerHTML = `



<div class="top-position">

${index + 1}

</div>



${avatar}



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

Ошибка загрузки топа

</div>

`;



}



}








// первая загрузка


loadTop();







// обновление


setInterval(

loadTop,

10000

);
