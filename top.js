// ===================================
// URALcoin TOP v16
// Players Rating System
// ===================================



async function loadTop(){



const list =

document.getElementById(

"topList"

);





if(!list)

return;






list.innerHTML =

"Загрузка...";






try{



let response = await fetch(

CONFIG.API_URL+

"/top"

);






let data = await response.json();







let players =

data.players || [];







if(

players.length===0

){



list.innerHTML =

"Игроков пока нет";



return;



}






list.innerHTML="";







players.forEach(

(player,index)=>{





let card = document.createElement(

"div"

);





card.className=

"top-player";








let avatar = "";






if(player.photo){



avatar =

`

<img class="top-photo"

src="${player.photo}">

`;



}

else{



avatar =

`

<div class="top-avatar-letter">

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

<div class="top-place">

#${index+1}

</div>


${avatar}



<div class="top-info">


<div class="top-name">

${player.name || "Игрок"}

</div>


<div class="top-balance">

${

Number(player.balance || 0)

.toFixed(3)

.replace(".",",")

}

U

</div>


</div>


`;








list.appendChild(card);







});







}

catch(error){



console.log(

"TOP ERROR",

error

);




list.innerHTML =

"Ошибка загрузки";



}



}









// открытие вкладки ТОП


document.addEventListener(

"DOMContentLoaded",

()=>{





document

.querySelectorAll(".nav")

.forEach(button=>{





button.addEventListener(

"click",

()=>{





if(

button.dataset.page==="tops"

){



loadTop();



}



}



);






});








});









window.loadTop = loadTop;
