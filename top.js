// =================================
// URALcoin TOP v5
// Серверный рейтинг игроков
// =================================




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

API_URL + "/top"

);






const players =

await response.json();







if(

!players ||

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







players.forEach(

(player,index)=>{



const place =

index + 1;








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

${formatTopBalance(player.balance)}

 U

</div>





<div class="top-friends">

Приглашено:

${player.friends || 0}

</div>



</div>



`;








list.appendChild(card);



});





}

catch(error){



console.log(

"Ошибка загрузки топа",

error

);





list.innerHTML = `

<div class="top-empty">

Ошибка соединения

</div>

`;



}





}









// загрузка при открытии вкладки


document

.querySelector(

'[data-page="tops"]'

)

?.addEventListener(

"click",

()=>{



loadTop();



}

);









// первая загрузка


setTimeout(

()=>{


loadTop();


},

1500

);








// обновление


setInterval(

()=>{


loadTop();


},

10000

);
