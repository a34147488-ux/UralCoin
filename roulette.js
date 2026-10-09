// ===================================
// URALcoin ROULETTE JS v1
// ===================================


let rouletteBetType = null;





const rouletteWheel =

document.getElementById(
"rouletteWheel"
);



const rouletteTimer =

document.getElementById(
"rouletteTimer"
);



const rouletteResult =

document.getElementById(
"rouletteResult"
);



const rouletteMessage =

document.getElementById(
"rouletteMessage"
);





const rouletteAmount =

document.getElementById(
"rouletteAmount"
);






// ===============================
// SELECT BET
// ===============================


document
.querySelectorAll(".roulette-bet")
.forEach(btn=>{


btn.onclick=()=>{


document
.querySelectorAll(".roulette-bet")
.forEach(b=>{

b.classList.remove("active");

});



btn.classList.add("active");



rouletteBetType =

btn.dataset.bet;



};


});









// ===============================
// PLACE BET
// ===============================


const rouletteStart =

document.getElementById(
"rouletteStart"
);





if(rouletteStart){


rouletteStart.onclick = async()=>{



if(!rouletteBetType){


rouletteMessage.innerText=

"Выберите ставку";


return;


}







let player =

Storage.getPlayer();







let amount =

Number(

rouletteAmount.value

);







if(!amount || amount<=0){


rouletteMessage.innerText=

"Введите сумму";


return;


}







let res =

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


type:rouletteBetType,


amount:amount



})


}

);



let data =

await res.json();






rouletteMessage.innerText =

data.message ||

"Готово";



};


}









// ===============================
// CHECK STATE
// ===============================


async function updateRoulette(){



try{



let res =

await fetch(

CONFIG.API+

"/roulette/state"

);



let data =

await res.json();







if(rouletteTimer){


rouletteTimer.innerText =

data.timeLeft;


}






if(

data.result!==null &&

data.result!==undefined

){



rouletteResult.innerText =

data.result;






if(rouletteWheel){



rouletteWheel.classList.add(
"spin"
);



setTimeout(()=>{


rouletteWheel.classList.remove(
"spin"
);


},6000);



}




}






}


catch(e){


console.log(
"roulette error",
e
);


}



}









setInterval(

updateRoulette,

1000

);




updateRoulette();
