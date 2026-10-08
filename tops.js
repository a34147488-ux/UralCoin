function formatTopNumber(num){


return Number(num)
.toFixed(3)
.replace(".",",");



}








function getPlayers(){



let players =

JSON.parse(

localStorage.getItem(
"players"
)

)

||
[];





let current =
Storage.getPlayer();






// добавляем текущего игрока


let exists =

players.find(

p=>
p.id === current.id

);






if(!exists){



players.push({

id:
current.id,


name:
current.name ||
"Игрок",


photo:
current.photo ||
"",


balance:
current.balance ||
0,


friends:
current.friends ||
0


});



}






else{



exists.balance =
current.balance;



exists.friends =
current.friends;



}





localStorage.setItem(

"players",

JSON.stringify(players)

);





return players;



}









function loadTop(){



const box =
document.getElementById(
"topList"
);





if(!box)
return;





box.innerHTML="";






let players =
getPlayers();






players.sort(

(a,b)=>

b.balance -
a.balance

);







players
.slice(0,20)
.forEach(

(player,index)=>{






let avatar = "";





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

#${index+1}

${player.name}

</b>



<br>


<span>

${formatTopNumber(
player.balance
)}

U

</span>



<br>



<span>

Приглашено:

${player.friends || 0}

</span>



</div>



`;







box.appendChild(
item
);





}
);




}









loadTop();









// обновление топа каждые 5 секунд


setInterval(

loadTop,

5000

);
