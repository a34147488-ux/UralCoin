// ===================================
// URALcoin TOP v15.5
// Players Rating
// ===================================


async function loadTop(){


const list = document.getElementById(
"topList"
);



if(!list){

return;

}




list.innerHTML =
"Загрузка...";





try{


let response = await fetch(

CONFIG.API_URL + "/top"

);



let data = await response.json();





let players = data.players || data || [];






if(!players.length){


list.innerHTML =
"Игроков пока нет";


return;


}






list.innerHTML = "";





players.forEach((player,index)=>{



let card = document.createElement(
"div"
);



card.className =
"top-player";





let avatar = player.photo

?

`<img src="${player.photo}">`

:

`<div class="top-avatar-letter">
${(player.name || "U").charAt(0)}
</div>`;







card.innerHTML = `


${avatar}


<div class="top-info">


<div class="top-name">

#${index+1}

${player.name || "Игрок"}

</div>



<div class="top-balance">

${Number(player.balance || 0)
.toFixed(3)
.replace(".",",")} U

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

"Ошибка загрузки топа";


}



}









// обновление при открытии вкладки


document.querySelectorAll(".nav").forEach(btn=>{


btn.addEventListener(

"click",

()=>{


if(btn.dataset.page==="tops"){


loadTop();


}


}


);



});







// первый запуск


loadTop();
