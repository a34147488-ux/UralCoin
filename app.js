// ===================================
// URALcoin APP v15.5
// Server Balance Sync
// Stable Click System
// ===================================


const tg = window.Telegram.WebApp;


tg.ready();

tg.expand();





let player = null;





// ===============================
// LOAD PLAYER
// ===============================


async function loadPlayer(){


player = Storage.getPlayer();



if(!player.id){

console.log("NO TELEGRAM USER");

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



}



catch(e){


console.log(

"LOAD ERROR",

e

);



}



}









// ===============================
// CLICK
// ===============================


const clickButton =

document.getElementById(

"clickButton"

);






if(clickButton){



clickButton.onclick = async ()=>{



let player = Storage.getPlayer();





let power =

Number(

player.clickPower || 0.01

);







player.balance =

Number(player.balance || 0)

+

power;







Storage.savePlayer(player);





updateScreen();






// отправляем на сервер


syncBalance();






createClickEffect(power);



};



}









// ===============================
// SYNC SERVER
// ===============================


async function syncBalance(){



let player = Storage.getPlayer();




try{



await fetch(

CONFIG.API_URL+"/sync",

{


method:"POST",


headers:{


"Content-Type":

"application/json"


},


body:JSON.stringify({


id:String(player.id),


balance:Number(player.balance)


})


}

);




}



catch(e){


console.log(

"SYNC ERROR",

e

);



}



}









// ===============================
// UPDATE SCREEN
// ===============================


function updateScreen(){



let player = Storage.getPlayer();





let balance =

document.getElementById(

"balance"

);



if(balance)

balance.innerText =

Number(player.balance || 0)

.toFixed(3)

.replace(".",",");







let power =

document.getElementById(

"clickPower"

);



if(power)

power.innerText =

Number(player.clickPower || 0)

.toFixed(3)

.replace(".",",");








let second =

document.getElementById(

"secondPower"

);



if(second)

second.innerText =

Number(player.autoPower || 0)

.toFixed(3)

.replace(".",",");







let crystals =

document.getElementById(

"crystals"

);



if(crystals)

crystals.innerText =

player.crystals || 0;



}









// ===============================
// CLICK EFFECT
// ===============================


function createClickEffect(value){



let el=document.createElement(

"div"

);



el.className="click-number";



el.innerText=

"+"+

Number(value)

.toFixed(3);





document.body.appendChild(el);






setTimeout(()=>{


el.remove();


},800);



}









// ===============================
// AUTO INCOME
// ===============================


setInterval(()=>{


let player = Storage.getPlayer();




if(

Number(player.autoPower)>0

){



player.balance +=

Number(player.autoPower);



Storage.savePlayer(player);



updateScreen();



syncBalance();



}



},1000);









// START


loadPlayer();
