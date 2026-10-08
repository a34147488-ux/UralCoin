// UralCoin TOP v3
// Серверный рейтинг игроков




function formatTopBalance(value){


return Number(value || 0)

.toFixed(3)

.replace(".", ",");


}







async function renderTop(){



const list =

document.getElementById(
"topList"
);





if(!list)
return;






if(
!window.API
){

return;

}







const players =

await API.getTop();







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








players
.slice(0,20)
.forEach(

(player,index)=>{






const place =

index + 1;







let avatar = "";







if(
player.photo
){



avatar = `

<img class="top-avatar-img"

src="${player.photo}">

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





<div class="top-avatar">

${avatar}

</div>






<div class="top-data">



<div class="top-name">

${player.name || "Игрок"}

</div>





<div class="top-balance">

${formatTopBalance(
player.balance
)} U

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












// обновление при открытии страницы


document
.querySelector('[data-page="tops"]')

?.addEventListener(
"click",
()=>{


renderTop();



});








// первый запуск


setTimeout(()=>{


renderTop();


},1000);







// обновление каждые 10 секунд


setInterval(()=>{


renderTop();


},10000);
