// ===================================
// URALcoin ROULETTE v5
// ===================================


let rouletteStarted = false;





function startRoulette(){


if(rouletteStarted)

return;


rouletteStarted=true;





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



let wheel =

document.getElementById(
"rouletteWheel"
);



if(!wheel)

return;



wheel.innerHTML="";






let reds=[

1,3,5,7,9,12,14,16,18,

19,21,23,25,27,30,32,34,36

];







for(let i=0;i<=36;i++){



let num=document.createElement(
"div"
);



num.className="wheel-number";



if(i===0)

num.classList.add("green");

else if(
reds.includes(i)
)

num.classList.add("red");

else

num.classList.add("black");






num.innerHTML=i;






let angle =

(i*9.73);






num.style.transform=

`

rotate(${angle}deg)

translateY(-130px)

rotate(-${angle}deg)

`;





wheel.appendChild(num);



}



}









// ===============================
// BET BUTTONS
// ===============================


document.addEventListener(

"click",

(e)=>{



if(

e.target.classList.contains(
"roulette-bet"
)

){



document
.querySelectorAll(
".roulette-bet"
)

.forEach(b=>{

b.classList.remove(
"active"
);

});




e.target.classList.add(
"active"
);




window.currentRouletteBet=

e.target.dataset.bet;



}



});









// ===============================
// BET
// ===============================


document.addEventListener(

"click",

async(e)=>{



if(
e.target.id!=="rouletteStart"
)

return;






let player=

Storage.getPlayer();




let amount=

Number(

document.getElementById(
"rouletteAmount"
).value

);






if(!window.currentRouletteBet){


alert(
"Выберите ставку"
);


return;


}







let res=

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


type:

window.currentRouletteBet



})


}

);






let data=

await res.json();






document.getElementById(

"rouletteMessage"

).innerHTML=

data.message;



});









// ===============================
// LOAD STATE
// ===============================


async function loadRoulette(){



try{



let res=

await fetch(

CONFIG.API+

"/roulette/state"

);



let data=

await res.json();






let timer=

document.getElementById(
"rouletteTimer"
);



if(timer)

timer.innerHTML=

"До конца: "+data.timeLeft+" сек";








let bank=

document.getElementById(
"rouletteBank"
);



if(bank)

bank.innerHTML=

"Ставок: "+data.bets;









if(

data.result!==null &&

data.result!==undefined

){



spinWheel(
data.result
);



}







}

catch(e){



console.log(
"roulette load error"
);



}



}









function spinWheel(number){



let wheel=

document.getElementById(
"rouletteWheel"
);



if(!wheel)

return;







let rotate=

3600 -

(number*9.73);






wheel.style.transform=

"rotate("+rotate+"deg)";






let result=

document.getElementById(
"rouletteResult"
);



if(result)

result.innerHTML=

"Выпало: "+number;



}
