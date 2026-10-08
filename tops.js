// UralCoin v2
// Топ игроков



function formatTop(value){


return Number(value)
.toFixed(3)
.replace(".",",");



}









function saveCurrentPlayerToTop(){



let player =
Storage.getPlayer();





let players =

JSON.parse(

localStorage.getItem(
"ural_players"
)

)

||
[];







let index =

players.findIndex(

p=>
p.id === player.id

);







let data = {


id:
player.id,



name:
player.name ||
"Игрок",



photo:
player.photo ||
"",



balance:
player.balance || 0,



friends:
player.friends || 0



};









if(index === -1){



players.push(
data
);



}

else{



players[index] =
data;



}







localStorage.setItem(

"ural_players",

JSON.stringify(players)

);





}












function loadTop(){



const list =
document.getElementById(
"topList"
);






if(!list)
return;






saveCurrentPlayerToTop();






let players =

JSON.parse(

localStorage.getItem(
"ural_players"
)

)

||
[];









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






let avatar;



if(player.photo){



avatar =

`

<img class="top-avatar"
src="${player.photo}">

`;



}

else{



avatar =

`

<div class="top-avatar">

${index+1}

</div>

`;



}









let item =
document.createElement(
"div"
);





item.className =
"top-player";







item.innerHTML = `


${avatar}


<div class="top-info">


<b>

${index+1}. 
${player.name}

</b>



<br>


<span>

${formatTop(player.balance)}
U

</span>



<br>


<small>

Приглашено:
${player.friends}

</small>


</div>


`;






list.appendChild(
item
);





});



}









loadTop();








// обновление после изменений



setInterval(

()=>{

loadTop();

},

5000

);
