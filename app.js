// =================================
// URALcoin APP v13.3
// CORE FIX
// =================================


let player = Storage.getPlayer();



function formatNumber(value){

return Number(value || 0)
.toFixed(3)
.replace(".",",");

}






function updateScreen(){


player = Storage.getPlayer();



let balance =
document.getElementById("balance");


let power =
document.getElementById("clickPower");


let second =
document.getElementById("secondPower");



if(balance){

balance.innerText =
formatNumber(player.balance);

}



if(power){

power.innerText =
formatNumber(player.clickPower);

}



if(second){

second.innerText =
formatNumber(player.autoPower);

}



let crystals =
document.getElementById("crystals");


if(crystals){

crystals.innerText =
player.crystals || 0;

}




if(typeof checkPromo==="function"){

checkPromo();

}



}








// ===============================
// TELEGRAM PROFILE
// ===============================


function loadTelegram(){



if(!window.Telegram)

return;



let user =

Telegram.WebApp.initDataUnsafe.user;



if(!user)

return;



if(Storage.updateTelegramProfile){

Storage.updateTelegramProfile(user);

}



let img =
document.getElementById("userAvatar");



let letter =
document.getElementById("avatarLetter");




if(user.photo_url && img){


img.src=user.photo_url;

img.style.display="block";


if(letter)

letter.style.display="none";


}


}









// ===============================
// CLICK
// ===============================


let clickButton =

document.getElementById(
"clickButton"
);



if(clickButton){


clickButton.onclick=function(){



player =
Storage.getPlayer();



player.balance +=

Number(player.clickPower || 0);






Storage.savePlayer(player);






updateScreen();






if(typeof showClickAnimation==="function"){

showClickAnimation(
player.clickPower
);

}



if(typeof clickHeat==="function"){

clickHeat();

}



};



}









// ===============================
// AUTO POWER
// ===============================


setInterval(()=>{


player =
Storage.getPlayer();



if(Number(player.autoPower)>0){



player.balance +=

Number(player.autoPower)/60;



Storage.savePlayer(player);


updateScreen();


}



},1000);










// ===============================
// API KEY
// ===============================



let apiBtn =

document.getElementById(
"apiBtn"
);




if(apiBtn){



apiBtn.onclick=function(){



player =
Storage.getPlayer();




if(!player.apiKey){



player.apiKey =

"UC-"

+

Math.random()

.toString(36)

.substring(2,10)

.toUpperCase();



Storage.savePlayer(player);



}



alert(

"Ваш API ключ:\n\n"

+

player.apiKey

);



};



}









// ===============================
// MENU
// ===============================


document

.querySelectorAll(".nav")

.forEach(button=>{


button.onclick=function(){



let page =

this.dataset.page;





document

.querySelectorAll(".page")

.forEach(item=>{


item.classList.remove("active");


});







let target =

document.getElementById(page);






if(target){

target.classList.add("active");

}



document

.querySelectorAll(".nav")

.forEach(btn=>{


btn.classList.remove("active");


});





this.classList.add("active");



};



});









// ===============================
// SYNC
// ===============================



async function syncBalance(){



try{


if(!CONFIG.API_URL)

return;




player =
Storage.getPlayer();





await fetch(

CONFIG.API_URL+"/sync",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

id:player.id,

balance:player.balance

})

}

);



}

catch(error){

console.log(
"SYNC ERROR"
);

}



}






setInterval(

syncBalance,

10000

);









// ===============================
// START
// ===============================


loadTelegram();




if(typeof registerPromo==="function"){

registerPromo();

}



if(typeof checkPromo==="function"){

checkPromo();

}




setTimeout(()=>{


if(typeof drawUpgrades==="function"){

drawUpgrades();

}


},500);




updateScreen();
