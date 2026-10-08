// =================================
// URALcoin TOP v14
// SERVER TOP FIX
// =================================



async function loadTop(){


const box =

document.getElementById(
"topList"
);



if(!box)

return;





try{



let response = await fetch(

CONFIG.API_URL + "/top"

);





let data = await response.json();






let players =

data.players || [];







if(!players.length){



box.innerHTML = `

<div class="top-card">

Игроков пока нет

</div>

`;

return;


}







box.innerHTML="";






players.forEach((player,index)=>{



let avatar = "";







if(player.photo){


avatar = `

<img class="top-avatar-img"

src="${player.photo}">

`;


}

else{



avatar = `

<div class="top-avatar">

${

(player.name || "U")

.charAt(0)

.toUpperCase()

}

</div>

`;



}









box.innerHTML += `


<div class="top-card">



<div class="place">

#${index+1}

</div>




${avatar}




<div class="top-info">


<b>

${player.name || "Игрок"}

</b>



<div class="top-balance">

${formatNumber(player.balance)} U

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



box.innerHTML = `

<div class="top-card">

Ошибка загрузки топа

</div>

`;



}



}







loadTop();




setInterval(

loadTop,

30000

);
