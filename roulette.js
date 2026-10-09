// ===================================
// URALcoin ROULETTE v2
// ===================================


document.addEventListener(
"DOMContentLoaded",
()=>{



let selectedBet = null;





const buttons =

document.querySelectorAll(
".roulette-bet"
);





buttons.forEach(btn=>{


btn.addEventListener(
"click",
()=>{


buttons.forEach(b=>{

b.classList.remove("active");

});



btn.classList.add("active");



selectedBet =

btn.dataset.bet;



console.log(
"bet selected",
selectedBet
);



});



});









const betButton =

document.getElementById(
"rouletteStart"
);







if(betButton){



betButton.addEventListener(
"click",
async()=>{





let player =

Storage.getPlayer();






let amount =

Number(

document.getElementById(
"rouletteAmount"
).value

);






if(!selectedBet){


alert(
"Выберите ставку"
);


return;


}






if(!amount || amount<=0){


alert(
"Введите сумму"
);


return;


}







try{



let response =

await fetch(

CONFIG.API+

"/roulette/bet",

{


method:"POST",


headers:{


"Content-Type":

"application/json"

},


body:JSON.stringify({


id:player.id,


type:selectedBet,


amount:amount



})


}

);






let data =

await response.json();






document.getElementById(
"rouletteMessage"
).innerText =

data.message;



}

catch(e){



console.log(e);



}



}


);



}









async function rouletteUpdate(){



try{



let response =

await fetch(

CONFIG.API+

"/roulette/state"

);



let data =

await response.json();






document.getElementById(
"rouletteTimer"
).innerText =

data.timeLeft;






if(data.result!==null){



let wheel =

document.getElementById(
"rouletteWheel"
);



wheel.style.transform =

"rotate("+

(

360*8 +

data.result*9.7

)

+"deg)";






document.getElementById(
"rouletteResult"
).innerText =

data.result;



}



}

catch(e){



console.log(
"roulette state error"
);



}



}






setInterval(

rouletteUpdate,

1000

);





rouletteUpdate();



});
