// ===================================
// URALcoin APP v16
// Stable Click + Balance Sync
// ===================================


let player = null;






// ===============================
// LOAD PLAYER
// ===============================


async function loadPlayer(){



player = Storage.getPlayer();






if(!player.id){


console.log(
"NO TELEGRAM ID"
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






if(typeof drawUpgrades==="function"){


drawUpgrades();


}






if(typeof createPromo==="function"){


createPromo();


}





if(typeof loadTop==="function"){


loadTop();


}






}



catch(error){


console.log(

"LOAD PLAYER ERROR",

error

);



}



}









// ===============================
// CLICKER
// ===============================



function initClicker(){



const button =

document.getElementById(

"clickButton"

);






if(!button)

return;






button.onclick = ()=>{



let user = Storage.getPlayer();






let power =

Number(
user.clickPower || 0.01
);







user.balance =

Number(
user.balance || 0
)

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
// SYNC BALANCE
// ===============================



async function syncBalance(){



let user = Storage.getPlayer();






if(!user.id)

return;






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
// UPDATE SCREEN
// ===============================



function updateScreen(){



let user = Storage.getPlayer();






const balance =

document.getElementById(

"balance"

);





if(balance){



balance.innerText =

Number(
user.balance || 0
)

.toFixed(3)

.replace(".",",");



}






const power =

document.getElementById(

"clickPower"

);





if(power){



power.innerText =

Number(
user.clickPower || 0.01
)

.toFixed(3)

.replace(".",",");



}






const second =

document.getElementById(

"secondPower"

);






if(second){



second.innerText =

Number(
user.autoPower || 0
)

.toFixed(3)

.replace(".",",");



}






const crystals =

document.getElementById(

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



initClicker();



loadPlayer();



});





window.updateScreen = updateScreen;

window.syncBalance = syncBalance;
