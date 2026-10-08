// UralCoin TOP v3
// Серверные топы игроков


function formatTopBalance(value){


return Number(value || 0)

.toFixed(3)

.replace(".", ",");


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

CONFIG.API_URL + "/top"

);





const players =

await response.json();








if(

!Array.isArray(players)

||

players.length === 0

){



list.innerHTML = `

<div class="top-empty">

Игроков пока нет

</div>

`;



return;



}









list.innerHTML = "";









players

.sort(

(a,b)=>

Number(b.balance || 0)

-

Number(a.balance || 0)

)



.slice(0,20)

.forEach(

(player,index)=>{





const place =

index + 1;






let avatar = "";






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

${place}

</div>

`;



}









const card =

document.createElement(

"div"

);





card.className =

"top-card";









card.innerHTML = `



<div class="top-position">

${place}

</div>



${avatar}



<div class="top-data">



<div class="top-name">

${player.name || "Игрок"}

</div>




<div class="top-balance">

${formatTopBalance(player.balance)} U

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

"Ошибка загрузки топа",

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
