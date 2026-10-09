// ===================================
// URALcoin ROULETTE v3
// Wheel numbers + bets
// ===================================


document.addEventListener(
"DOMContentLoaded",
()=>{



const wheel =

document.getElementById(
"rouletteWheel"
);



const resultText =

document.getElementById(
"rouletteResult"
);



const timerText =

document.getElementById(
"rouletteTimer"
);



const message =

document.getElementById(
"rouletteMessage"
);



const amountInput =

document.getElementById(
"rouletteAmount"
);





let selectedBet = null;





// ===============================
// CREATE NUMBERS
// ===============================


if(wheel){



let colors = {



0:"green",



1:"red",
2:"black",
3:"red",
4:"black",
5:"red",
6:"black",
7:"red",
8:"black",
9:"red",
10:"black",
11:"black",
12:"red",
13:"black",
14:"red",
15:"black",
16:"red",
17:"black",
18:"red",
19:"red",
20:"black",
21:"red",
22:"black",
23:"red",
24:"black",
25:"red",
26:"black",
27:"red",
28:"black",
29:"black",
30:"red",
31:"black",
32:"red",
33:"black",
34:"red",
35:"black",
36:"red"



};






for(let i=0;i<=36;i++){



let n=document.createElement(
"div"
);



n.className=

"wheel-number "+colors[i];



n.innerHTML=i;



let angle =

(i*9.73)-90;



n.style.transform=

`

rotate(${angle}deg)

translate(125px)

rotate(-${angle}deg)

`;



wheel.appendChild(n);



}



}









// ===============================
// BET BUTTONS
// ===============================


document
.querySelectorAll(
".roulette-bet"
)

.forEach(btn=>{



btn.onclick=()=>{



document
.querySelectorAll(
".roulette-bet"
)

.forEach(b=>

b.classList.remove(
"active"
)

);



btn.classList.add(
"active"
);



selectedBet=

btn.dataset.bet;



};



});









// ===============================
// SEND BET
// ===============================


let startBtn=

document.getElementById(
"rouletteStart"
);





if(startBtn){



startBtn.onclick=

async()=>{





let player=

Storage.getPlayer();






let amount=

Number(
amountInput.value
);







if(!selectedBet){


message.innerText=

"Выберите ставку";


return;


}







if(!amount){


message.innerText=

"Введите сумму";


return;


}








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


type:selectedBet



})


}

);







let data=

await response.json();






message.innerText=

data.message;



};



}









// ===============================
// STATE
// ===============================


async function update(){



try{



let response=

await fetch(

CONFIG.API+

"/roulette/state"

);




let data=

await response.json();






if(timerText)

timerText.innerText=

data.timeLeft;








if(data.result!==null){





let deg=

(360*10)

-

(data.result*9.73);






if(wheel){



wheel.style.transform=

`

rotate(${deg}deg)

`;



}







if(resultText)

resultText.innerText=

data.result;



}





}

catch(e){



console.log(
"roulette",
e
);



}



}






setInterval(

update,

1000

);



update();



});
