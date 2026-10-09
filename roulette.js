// ===================================
// URALcoin ROULETTE v11 FINAL
// CLEAN VERSION
// ===================================


let selectedBet = null;

let rouletteInit = false;

let lastRouletteResult = null;





// ===================================
// INIT
// ===================================


function initRoulette(){


if(rouletteInit)

return;


rouletteInit = true;



drawRouletteWheel();


setupBetButtons();


setupStartButton();


loadRoulette();



setInterval(

loadRoulette,

1000

);



}









// ===================================
// DRAW WHEEL
// ===================================


function drawRouletteWheel(){



const wheel = document.getElementById(
"rouletteWheel"
);



if(!wheel)

return;



wheel.innerHTML="";




const redNumbers=[

1,3,5,7,9,

12,14,16,18,

19,21,23,25,27,

30,32,34,36

];





const radius = 95;





for(let i=0;i<=36;i++){



let el=document.createElement(
"div"
);



el.className="wheel-number";



el.innerText=i;




if(i===0){


el.classList.add("green");


}

else if(
redNumbers.includes(i)
){


el.classList.add("red");


}

else{


el.classList.add("black");


}






let angle =

(i*(360/37))-90;





let x=

Math.cos(
angle*Math.PI/180
)

*

radius;





let y=

Math.sin(
angle*Math.PI/180
)

*

radius;







el.style.left=

`calc(50% + ${x}px)`;



el.style.top=

`calc(50% + ${y}px)`;







wheel.appendChild(el);



}



}









// ===================================
// BET BUTTONS
// ===================================


function setupBetButtons(){



document
.querySelectorAll(".roulette-bet")
.forEach(button=>{



button.onclick=function(){



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





selectedBet=

this.dataset.bet;





};



});



}









// ===================================
// START BUTTON
// ===================================


function setupStartButton(){



let btn=

document.getElementById(
"rouletteStart"
);



if(!btn)

return;



btn.onclick=

sendBet;



}









// ===================================
// SEND BET
// ===================================


async function sendBet(){



let message=

document.getElementById(
"rouletteMessage"
);



let input=

document.getElementById(
"rouletteAmount"
);



let amount=

Number(input.value);





if(!selectedBet){



message.innerText=

"Выберите ставку";

return;



}





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


type:selectedBet



})


}

);






let data=

await response.json();





message.innerText=

data.message ||

"Готово";





}

catch(error){



console.log(
error
);



message.innerText=

"Ошибка соединения";


}



}









// ===================================
// LOAD STATE
// ===================================


async function loadRoulette(){



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

){



if(

lastRouletteResult!==

data.result.number

){



lastRouletteResult=

data.result.number;



spinRoulette(

data.result.number

);



}



}





}

catch(e){



console.log(
"roulette load error",
e
);



}



}









// ===================================
// SPIN
// ===================================


function spinRoulette(number){



let wheel=

document.getElementById(
"rouletteWheel"
);



if(!wheel)

return;






let rotate=

3600-

(number*(360/37));






wheel.style.transform=

`rotate(${rotate}deg)`;






let result=

document.getElementById(
"rouletteResult"
);



if(result){



result.innerText=

"Выпало: "

+

number;



}



}









document.addEventListener(

"DOMContentLoaded",

()=>{



setTimeout(

initRoulette,

700

);



});
