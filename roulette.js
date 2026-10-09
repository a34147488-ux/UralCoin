// ===================================
// URALcoin ROULETTE v10 FINAL
// Clean Client
// ===================================


let rouletteBetType = null;

let rouletteStarted = false;

let lastResult = null;





// ===================================
// INIT
// ===================================


function initRoulette(){


if(rouletteStarted)

return;


rouletteStarted = true;



createWheel();


bindRouletteButtons();


loadRouletteState();



setInterval(()=>{


loadRouletteState();


},1000);



}









// ===================================
// WHEEL
// ===================================


function createWheel(){


const wheel = document.getElementById(
"rouletteWheel"
);



if(!wheel)

return;



wheel.innerHTML="";



const red=[

1,3,5,7,9,

12,14,16,18,

19,21,23,25,27,

30,32,34,36

];



const radius=100;



for(let i=0;i<=36;i++){


let number=document.createElement(
"div"
);



number.className="wheel-number";



number.innerText=i;



if(i===0){

number.classList.add("green");

}

else if(red.includes(i)){


number.classList.add("red");


}

else{


number.classList.add("black");


}





let angle=(360/37*i)-90;



let x=Math.cos(
angle*Math.PI/180
)*radius;



let y=Math.sin(
angle*Math.PI/180
)*radius;



number.style.left=

`calc(50% + ${x}px)`;



number.style.top=

`calc(50% + ${y}px)`;



wheel.appendChild(number);


}



}









// ===================================
// BUTTONS
// ===================================


function bindRouletteButtons(){



document
.querySelectorAll(".roulette-bet")
.forEach(btn=>{



btn.addEventListener(

"click",

()=>{



document
.querySelectorAll(".roulette-bet")
.forEach(b=>{

b.classList.remove("active");

});





btn.classList.add("active");



rouletteBetType=

btn.dataset.bet;



}

);



});







let start=

document.getElementById(
"rouletteStart"
);



if(start){



start.onclick=

makeBet;



}



}









// ===================================
// BET
// ===================================


async function makeBet(){



let message=

document.getElementById(
"rouletteMessage"
);



if(!rouletteBetType){



message.innerText=

"Выберите ставку";



return;


}






let amount=

Number(

document.getElementById(
"rouletteAmount"
).value

);







if(amount<=0){



message.innerText=

"Введите сумму";



return;



}







let player=

Storage.getPlayer();






try{



let res=

await fetch(

CONFIG.API.replace(/\/$/,"")

+

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


type:rouletteBetType



})


}

);








let data=

await res.json();







message.innerText=

data.message;



}

catch(e){



console.log(
e
);



message.innerText=

"Нет соединения с сервером";


}



}









// ===================================
// STATE
// ===================================


async function loadRouletteState(){



try{



let res=

await fetch(

CONFIG.API.replace(/\/$/,"")

+

"/roulette/state"

);



let data=

await res.json();







let timer=

document.getElementById(
"rouletteTimer"
);



if(timer){


timer.innerText=

"До конца раунда: "

+

data.timeLeft

+

" сек";


}








if(
data.result
&&

data.result.number!==undefined

){



if(

lastResult!==

data.result.number

){



lastResult=

data.result.number;



spinWheel(

data.result.number

);



}



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
// SPIN
// ===================================


function spinWheel(number){



let wheel=

document.getElementById(
"rouletteWheel"
);



if(!wheel)

return;






let rotation=

3600 -

(number*(360/37));





wheel.style.transform=

`rotate(${rotation}deg)`;






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

500

);


});
