// ===================================
// URALcoin ROULETTE v6
// Wheel + Numbers Fix
// ===================================


let rouletteStarted = false;

let currentBet = null;







function startRoulette(){


if(rouletteStarted)

return;


rouletteStarted = true;



createRouletteWheel();



loadRouletteState();



setInterval(

loadRouletteState,

1000

);



}









// ===============================
// CREATE WHEEL
// ===============================


function createRouletteWheel(){



const wheel =

document.getElementById(
"rouletteWheel"
);



if(!wheel)

return;





wheel.innerHTML="";






let redNumbers=[

1,3,5,7,9,

12,14,16,18,

19,21,23,25,27,

30,32,34,36

];







const radius = 125;







for(let i=0;i<=36;i++){



let number =

document.createElement(
"div"
);



number.className=

"wheel-number";






if(i===0){


number.classList.add(
"green"
);


}

else if(
redNumbers.includes(i)

){


number.classList.add(
"red"
);


}

else{


number.classList.add(
"black"
);


}







number.innerText=i;






let angle =

(i * (360/37)) - 90;






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






number.style.left=

"calc(50% + "+x+"px)";



number.style.top=

"calc(50% + "+y+"px)";






wheel.appendChild(number);



}



}









// ===============================
// SELECT BET
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

b=>

b.classList.remove(
"active"
)

);





e.target.classList.add(
"active"
);






currentBet=

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
e.target.id!=="rouletteStart"
)

return;







let amountInput=

document.getElementById(
"rouletteAmount"
);





let message=

document.getElementById(
"rouletteMessage"
);







if(!currentBet){



message.innerText=

"Выберите ставку";



return;



}






let amount=

Number(

amountInput.value

);







if(amount<=0){



message.innerText=

"Введите сумму";



return;



}







let player=

Storage.getPlayer();






try{



let response=

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


type:currentBet



})


}

);








let data=

await response.json();






message.innerText=

data.message;



}

catch(err){



console.log(err);



message.innerText=

"Ошибка подключения";


}



}

);









// ===============================
// LOAD STATE
// ===============================


async function loadRouletteState(){



try{



let response=

await fetch(

CONFIG.API+

"/roulette/state"

);



let data=

await response.json();






let timer=

document.getElementById(
"rouletteTimer"
);



if(timer)

timer.innerText=

"Раунд: "+data.timeLeft+" сек";






let bank=

document.getElementById(
"rouletteBank"
);



if(bank)

bank.innerText=

"Ставок: "+data.bets;







if(
data.result!==null

&&

data.result!==undefined

){



rotateRoulette(

data.result

);



}







}

catch(e){


console.log(
"roulette error",
e
);


}



}









// ===============================
// ROTATE
// ===============================


function rotateRoulette(number){



let wheel=

document.getElementById(
"rouletteWheel"
);



if(!wheel)

return;







let angle=

3600 -

(number*(360/37));







wheel.style.transform=

"rotate("+angle+"deg)";






let result=

document.getElementById(
"rouletteResult"
);



if(result)

result.innerText=

"Выпало: "+number;



}
