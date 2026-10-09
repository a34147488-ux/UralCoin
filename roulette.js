// ===================================
// URALcoin ROULETTE v7
// FULL FIX
// ===================================


let rouletteBet = null;

let rouletteLoaded = false;





// ===============================
// START
// ===============================


function startRoulette(){


if(rouletteLoaded)

return;



rouletteLoaded=true;



createWheel();



loadRoulette();



setInterval(

loadRoulette,

1000

);



}









// ===============================
// CREATE WHEEL
// ===============================


function createWheel(){



const wheel =

document.getElementById(
"rouletteWheel"
);



if(!wheel)

return;



wheel.innerHTML="";






const redNumbers = [

1,3,5,7,9,

12,14,16,18,

19,21,23,25,27,

30,32,34,36

];







const radius = 105;






for(let i=0;i<=36;i++){



const el =

document.createElement(
"div"
);



el.className=

"wheel-number";





if(i===0){


el.classList.add(
"green"
);


}

else if(
redNumbers.includes(i)
){


el.classList.add(
"red"
);


}

else{


el.classList.add(
"black"
);


}







el.innerText=i;







let angle =

(i*(360/37))-90;






let x =

Math.cos(

angle*Math.PI/180

)

*

radius;







let y =

Math.sin(

angle*Math.PI/180

)

*

radius;







el.style.left =

"calc(50% + "+x+"px)";




el.style.top =

"calc(50% + "+y+"px)";







wheel.appendChild(el);



}



}









// ===============================
// CHOOSE BET
// ===============================


document.addEventListener(

"click",

function(e){



if(

e.target.classList.contains(
"roulette-bet"
)

){



document

.querySelectorAll(
".roulette-bet"
)

.forEach(

b=>b.classList.remove(
"active"
)

);





e.target.classList.add(
"active"
);






rouletteBet =

e.target.dataset.bet;





}



}

);









// ===============================
// MAKE BET
// ===============================


document.addEventListener(

"click",

async function(e){



if(

e.target.id !==

"rouletteStart"

)

return;






const amountInput =

document.getElementById(
"rouletteAmount"
);






const message =

document.getElementById(
"rouletteMessage"
);






if(!rouletteBet){


if(message)

message.innerText=

"Выберите ставку";



return;



}







let amount =

Number(

amountInput.value

);






if(amount<=0){



message.innerText=

"Введите сумму ставки";



return;



}







let player =

Storage.getPlayer();







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


amount:amount,


type:rouletteBet



})


}

);







let data =

await response.json();







message.innerText =

data.message;



}

catch(err){



console.log(
"roulette bet error",

err

);



message.innerText=

"Ошибка соединения";


}



}

);









// ===============================
// LOAD ROULETTE
// ===============================


async function loadRoulette(){



try{



let response =

await fetch(

CONFIG.API+

"/roulette/state"

);



let data =

await response.json();







let timer =

document.getElementById(
"rouletteTimer"
);



if(timer)

timer.innerText=

"Раунд: "

+

data.timeLeft

+

" секунд";









let bank =

document.getElementById(
"rouletteBank"
);



if(bank)

bank.innerText=

"Ставок игроков: "

+

data.bets;









if(

data.result !== null

&&

data.result !== undefined

){



spinWheel(

data.result

);



}






}

catch(e){



console.log(
"roulette state error",

e

);



}



}









// ===============================
// SPIN
// ===============================


function spinWheel(number){



const wheel =

document.getElementById(
"rouletteWheel"
);



if(!wheel)

return;







let angle =

3600 -

(number*(360/37));







wheel.style.transform =

"rotate("+angle+"deg)";








let result =

document.getElementById(
"rouletteResult"
);







if(result)

result.innerText=

"Выпало: "

+

number;



}









// ===============================
// AUTO START
// ===============================


document.addEventListener(

"DOMContentLoaded",

()=>{


setTimeout(

()=>{


startRoulette();



},

500

);


});
