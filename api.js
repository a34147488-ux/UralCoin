// ===================================
// URALcoin APP v16
// Stable Click + Balance Sync
// ===================================


let tg = null;


if(
window.Telegram &&
window.Telegram.WebApp
){

tg = window.Telegram.WebApp;

tg.ready();

tg.expand();

}



let player = null;





// ===============================
// LOAD PLAYER
// ===============================


async function loadPlayer(){


player = Storage.getPlayer();




if(!player.id){


console.log(
"NO USER ID"
);


return;


}






try{


let response = await fetch(

CONFIG.API_URL +

"/user/" +

player.id

);





let serverUser = await response.json();





if(serverUser){



player = {


...player,


...serverUser


};



Storage.savePlayer(player);



}




updateScreen();






// запуск промокода после синхронизации


setTimeout(()=>{


if(typeof createPromo === "function"){


createPromo();


}



},1500);






}



catch(error){


console.log(

"PLAYER LOAD ERROR",

error

);



}



}









// ===============================
// CLICK
// ===============================


function setupClick(){



const button = document.getElementById(

"clickButton"

);






if(!button){


return;


}







button.onclick = async function(){



let user = Storage.getPlayer();






let power = Number(

user.clickPower || 0.01

);






user.balance =

Number(user.balance || 0)

+

power;







Storage.savePlayer(user);







updateScreen();






syncBalance();






if(typeof createClickEffect==="function"){


createClickEffect(power);


}





};






}









// ===============================
// SERVER SYNC
// ===============================


async function syncBalance(){



let user = Storage.getPlayer();





try{


await fetch(

CONFIG.API_URL+"/sync",

{


method:"POST",


headers:{


"Content-Type":"application/json"


},



body:JSON.stringify({


id:String(user.id),


balance:Number(user.balance)


})


}

);




}



catch(error){


console.log(

"SYNC ERROR",

error

);



}



}









// ===============================
// SCREEN UPDATE
// ===============================


function updateScreen(){



let user = Storage.getPlayer();





const balance = document.getElementById(

"balance"

);




if(balance){



balance.innerText =

Number(user.balance || 0)

.toFixed(3)

.replace(".",",");



}






const power = document.getElementById(

"clickPower"

);






if(power){



power.innerText =

Number(user.clickPower || 0.01)

.toFixed(3)

.replace(".",",");



}






const second = document.getElementById(

"secondPower"

);





if(second){


second.innerText =

Number(user.autoPower || 0)

.toFixed(3)

.replace(".",",");



}






const crystals = document.getElementById(

"crystals"

);






if(crystals){



crystals.innerText =

user.crystals || 0;



}





}









// ===============================
// AUTO INCOME
// ===============================


setInterval(()=>{



let user = Storage.getPlayer();





if(

Number(user.autoPower)>0

){



user.balance =

Number(user.balance || 0)

+

Number(user.autoPower);







Storage.savePlayer(user);



updateScreen();



syncBalance();



}



},1000);









// ===============================
// START
// ===============================


document.addEventListener(

"DOMContentLoaded",

()=>{


setupClick();


loadPlayer();



}

);
