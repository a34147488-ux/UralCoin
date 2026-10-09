// ===================================
// URALcoin Roulette FIX v4
// ===================================


window.addEventListener(
"load",
()=>{


let selectedBet = null;



const message =
document.getElementById("rouletteMessage");



const amount =
document.getElementById("rouletteAmount");



const start =
document.getElementById("rouletteStart");





document
.querySelectorAll(".roulette-bet")
.forEach(btn=>{


btn.addEventListener(
"click",
function(e){


e.preventDefault();


selectedBet=this.dataset.bet;



document
.querySelectorAll(".roulette-bet")
.forEach(b=>{

b.classList.remove("active");

});



this.classList.add("active");



if(message){

message.innerText=
"Выбрано: "+selectedBet;

}



});



});









if(start){


start.addEventListener(
"click",
async function(e){


e.preventDefault();




let player =
Storage.getPlayer();





if(!player || !player.id){


message.innerText=
"Нет Telegram ID";


return;


}






if(!selectedBet){


message.innerText=
"Сначала выберите ставку";


return;


}





let sum =
Number(amount.value);





if(!sum || sum<=0){


message.innerText=
"Введите сумму";


return;


}





try{



let api =

CONFIG.API_URL ||

CONFIG.API;






let response =

await fetch(

api+"/roulette/bet",

{


method:"POST",


headers:{


"Content-Type":

"application/json"

},


body:JSON.stringify({

id:String(player.id),

type:selectedBet,

amount:sum


})


}

);







let data =

await response.json();






message.innerText =

data.message ||

"Ставка принята";





}

catch(err){



console.log(err);



message.innerText=

"Ошибка соединения";



}





});



}








});
