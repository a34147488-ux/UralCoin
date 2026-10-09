// ===================================
// URALcoin ROULETTE v12 FINAL
// Animation + Result + History
// ===================================


let selectedBet = null;

let rouletteLocked = false;

let lastResult = null;

let wheelRotation = 0;







// ===================================
// START
// ===================================


function initRoulette(){


if(document.body.dataset.roulette)

return;


document.body.dataset.roulette="on";



createNumbers();


bindButtons();


loadState();



setInterval(

loadState,

1000

);



loadHistory();



}









// ===================================
// CREATE WHEEL NUMBERS
// ===================================


function createNumbers(){



let wheel=

document.getElementById(
"rouletteWheel"
);



if(!wheel)

return;




wheel.innerHTML="";




let red=[

1,3,5,7,9,

12,14,16,18,

19,21,23,25,27,

30,32,34,36

];






for(let i=0;i<=36;i++){



let n=document.createElement(
"div"
);



n.className="wheel-number";



n.innerText=i;






if(i===0){


n.classList.add("green");


}

else if(red.includes(i)){


n.classList.add("red");


}

else{


n.classList.add("black");


}







let angle=

(i*360/37)-90;





let radius=115;





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






n.style.left=

"calc(50% + "+x+"px)";



n.style.top=

"calc(50% + "+y+"px)";






wheel.appendChild(n);



}



}









// ===================================
// BUTTONS
// ===================================


function bindButtons(){



document

.querySelectorAll(".roulette-bet")

.forEach(btn=>{



btn.onclick=function(){



if(rouletteLocked)

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






selectedBet=

this.dataset.bet;



};




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
// SEND BET
// ===================================


async function makeBet(){



let msg=

document.getElementById(
"rouletteMessage"
);





if(rouletteLocked){


msg.innerText=

"Раунд завершён, ждём результат";


return;


}







if(!selectedBet){


msg.innerText=

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


msg.innerText=

"Введите сумму";


return;


}







let player=

Storage.getPlayer();






try{



let res=

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

await res.json();





msg.innerText=

data.message;



}

catch(e){



console.log(e);



msg.innerText=

"Ошибка соединения";



}



}









// ===================================
// STATE
// ===================================


async function loadState(){



try{



let res=

await fetch(

CONFIG.API_URL+

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

"Раунд: "

+

data.timeLeft

+

" сек";



}







if(

data.result &&

data.result.number!==undefined &&

data.result.number!==lastResult

){



lastResult=

data.result.number;



spinWheel(

data.result.number

);



}



}

catch(e){


console.log(
"state error",
e
);


}



}









// ===================================
// SPIN
// ===================================


function spinWheel(number){



rouletteLocked=true;



let wheel=

document.getElementById(
"rouletteWheel"
);



if(!wheel)

return;







let one=

360/37;





let target=

(number*one);






wheelRotation +=

(360*8)+

(360-target);






wheel.style.transform=

"rotate("+wheelRotation+"deg)";







setTimeout(()=>{



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



rouletteLocked=false;



loadHistory();



},5200);



}









// ===================================
// HISTORY
// ===================================


async function loadHistory(){



let box=

document.getElementById(
"rouletteHistory"
);



if(!box)

return;






try{



let res=

await fetch(

CONFIG.API_URL+

"/roulette/history"

);





let data=

await res.json();






box.innerHTML="";






data.history.forEach(item=>{



let row=document.createElement(
"div"
);



row.className=

"history-row";





row.innerHTML=

`

<b>

${item.number}

</b>

<span>

${item.color}

</span>

<small>

${item.date}

</small>

`;





box.appendChild(row);



});






}

catch(e){


console.log(e);


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
