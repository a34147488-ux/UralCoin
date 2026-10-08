// UralCoin v2
// Безопасная система топов


function formatTopBalance(value){

return Number(value)
.toFixed(3)
.replace(".", ",");

}







function getCurrentPlayerForTop(){


const player =
Storage.getPlayer();



return {

id:
player.id || "guest",


name:
player.name || "Игрок",


photo:
player.photo || "",


balance:
Number(player.balance || 0),


friends:
Number(player.friends || 0)

};


}









function savePlayerToTop(){



let players =

JSON.parse(

localStorage.getItem(
"ural_players"
)

)

|| [];





const current =
getCurrentPlayerForTop();





const index =
players.findIndex(

item =>

item.id === current.id

);







if(index === -1){


players.push(
current
);



}

else{


players[index] =
current;



}






localStorage.setItem(

"ural_players",

JSON.stringify(players)

);



}









function renderTop(){



const list =
document.getElementById(
"topList"
);





if(!list)
return;






savePlayerToTop();






let players =

JSON.parse(

localStorage.getItem(
"ural_players"
)

)

|| [];








players.sort(

(a,b)=>

b.balance -
a.balance

);






list.innerHTML = "";







players
.slice(0,20)
.forEach(

(player,index)=>{






let place =

index + 1;






let avatar;



if(player.photo){



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



${avatar}



<div class="top-data">


<div class="top-name">

${player.name}

</div>



<div class="top-balance">

${formatTopBalance(
player.balance
)} U

</div>



<div class="top-friends">

Приглашено:
${player.friends}

</div>



</div>



`;







list.appendChild(
card
);



});





}









renderTop();







setInterval(

renderTop,

5000

);
