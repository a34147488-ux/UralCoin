// ===================================
// URALcoin ROULETTE v13 FINAL
// Wheel + Numbers + Animation
// ===================================


let rouletteSelectedBet = null;

let rouletteBusy = false;

let currentRotation = 0;

let lastRouletteResult = null;







// ===================================
// INIT
// ===================================


function initRoulette(){


if(document.body.dataset.rouletteReady)

return;



document.body.dataset.rouletteReady="true";





buildWheel();


bindRouletteButtons();


updateRouletteState();



setInterval(

updateRouletteState,

1000

);



loadRouletteHistory();



}









// ===================================
// WHEEL BUILD
// ===================================


function buildWheel(){



let wheel = document.getElementById(
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






for(let i=0;i<=36;i++){



let number=document.createElement(
"div"
);



number.className="wheel-number";



number.innerHTML=i;






if(i===0){



number.classList.add(
"green"
);



}

else if(redNumbers.includes(i)){



number.classList.add(
"red"
);



}

else{



number.classList.add(
"black"
);



}







let angle =

(i*360/37)

-

90;






let radius=122;






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







number.dataset.number=i;






wheel.appendChild(number);



}





}









// ===================================
// BUTTONS
// ===================================


function bindRouletteButtons(){





document

.querySelectorAll(".roulette-bet")

.forEach(button=>{





button.onclick=function(){



if(rouletteBusy)

return;







document

.querySelectorAll(".roulette-bet")

.forEach(b=>{


b.classList.remove(
"active"
);



});







this.classList.add(
"active"
);







rouletteSelectedBet=

this.dataset.bet;



};






});









let start=

document.getElementById(
"rouletteStart"
);






if(start){



start.onclick=

sendRouletteBet;



}



}









// ===================================
// BET
// ===================================


async function sendRouletteBet(){



let message=

document.getElementById(
"rouletteMessage"
);






if(!rouletteSelectedBet){



message.innerText=

"Выберите ставку";



return;



}






let input=

document.getElementById(
"rouletteAmount"
);






let amount=

Number(input.value);







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

CONFIG.API_URL+

"/roulette/bet",

{

method:"POST",

headers:{


"Content-Type":

"application/json"



},


body:JSON.stringify({


id:String(player.id),


amount:amount,


type:rouletteSelectedBet



})

}


);








let data=

await response.json();






message.innerText=

data.message;






if(data.success){



input.value="";



}



}

catch(e){



message.innerText=

"Нет соединения с сервером";



}



}







// ===================================
// STATE
// ===================================


async function updateRouletteState(){



try{



let response=

await fetch(

CONFIG.API_URL+

"/roulette/state"

);






let data=

await response.json();






let timer=

document.getElementById(
"rouletteTimer"
);






if(timer){



timer.innerText=

"Раунд: "

+

data.timeLeft

+

" сек";



}






if(

data.result &&

data.result.number!==undefined

&&

data.result.number!==lastRouletteResult

){



lastRouletteResult=

data.result.number;



startWheelAnimation(

data.result.number

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
// ===================================
// SPIN ANIMATION
// ===================================


function startWheelAnimation(number){



rouletteBusy=true;




let wheel=document.getElementById(
"rouletteWheel"
);





if(!wheel)

return;








let sector=

360 / 37;







// число должно попасть под верхнюю стрелку

let stop=

360 -

(number * sector);







currentRotation +=

(360 * 8)

+

stop;







wheel.style.transition=

"transform 6s cubic-bezier(.15,.85,.25,1)";







wheel.style.transform=

"rotate("+

currentRotation+

"deg)";









setTimeout(()=>{



showRouletteResult(
number
);



rouletteBusy=false;



loadRouletteHistory();



},6500);







}









// ===================================
// RESULT
// ===================================


function showRouletteResult(number){



let result=

document.getElementById(
"rouletteResult"
);






let color="";






if(number===0){



color=

"🟢 Зеленое";



}

else{



let red=[


1,3,5,7,9,

12,14,16,18,

19,21,23,25,27,

30,32,34,36


];






color=

red.includes(number)

?

"🔴 Красное"

:

"⚫ Черное";



}







if(result){



result.innerHTML=


"Выпало: <b>"

+

number

+

"</b> "

+

color;



}






let numbers=

document.querySelectorAll(

".wheel-number"

);






numbers.forEach(n=>{



n.classList.remove(
"winner"
);



if(

Number(n.dataset.number)===number

){



n.classList.add(
"winner"
);



}



});





}









// ===================================
// HISTORY
// ===================================


async function loadRouletteHistory(){



let box=

document.getElementById(
"rouletteHistory"
);





if(!box)

return;






try{



let response=

await fetch(

CONFIG.API_URL+

"/roulette/history"

);







let data=

await response.json();








box.innerHTML="";








if(

!data.history ||

data.history.length===0

){



box.innerHTML=

"История пуста";



return;



}








data.history.forEach(item=>{



let row=

document.createElement(
"div"
);





row.className=

"history-row";






let icon="";






if(item.color==="red")

icon="🔴";



if(item.color==="black")

icon="⚫";



if(item.color==="green")

icon="🟢";








row.innerHTML=


`

<span>

${icon}

</span>


<b>

${item.number}

</b>


<small>

${item.date}

</small>

`;







box.appendChild(row);



});





}

catch(e){



console.log(

"history error",

e

);



}



}









// ===================================
// START
// ===================================


document.addEventListener(

"DOMContentLoaded",

()=>{



setTimeout(

initRoulette,

500

);



});
