// =================================
// URALcoin APP v13.2
// MAIN CORE
// =================================



let player = Storage.getPlayer();





function formatNumber(num){

return Number(num || 0)
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


let code =
document.getElementById("myPromo");


let activated =
document.getElementById("activatedCount");


let earned =
document.getElementById("promoEarn");








if(balance)

balance.innerText =
formatNumber(player.balance);





if(power)

power.innerText =
formatNumber(player.clickPower);





if(second)

second.innerText =
formatNumber(player.autoPower);







if(code)

code.value =
player.promoCode || "Создание...";







if(activated)

activated.innerText =
player.friends || 0;







if(earned)

earned.innerText =
formatNumber(player.earnedFromPromo)+" U";



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







Storage.updateTelegramProfile(user);






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

document.getElementById("clickButton");





if(clickButton){



clickButton.onclick=function(){



let player =
Storage.getPlayer();





player.balance +=

Number(player.clickPower);






Storage.savePlayer(player);






updateScreen();






if(typeof showClickAnimation==="function")

showClickAnimation(player.clickPower);






if(typeof clickHeat==="function")

clickHeat();



};



}









// ===============================
// AUTO POWER
// ===============================



setInterval(()=>{



let player =
Storage.getPlayer();





if(Number(player.autoPower)>0){



player.balance +=

Number(player.autoPower)/60;




Storage.savePlayer(player);



updateScreen();



}



},1000);









// ===============================
// NAVIGATION
// ===============================



document
.querySelectorAll(".nav")
.forEach(btn=>{


btn.onclick=function(){



let page =
this.dataset.page;





document
.querySelectorAll(".page")
.forEach(p=>{

p.classList.remove("active");

});






let target =
document.getElementById(page);






if(target)

target.classList.add("active");






document
.querySelectorAll(".nav")
.forEach(n=>{

n.classList.remove("active");

});





this.classList.add("active");



};



});









// ===============================
// COPY PROMO
// ===============================



let copyCode =

document.getElementById("copyCode");





if(copyCode){



copyCode.onclick=function(){



let player =
Storage.getPlayer();





if(player.promoCode){



navigator.clipboard.writeText(

player.promoCode

);



alert(
"Код скопирован"
);



}



};



}









// ===============================
// SYNC SERVER
// ===============================



async function syncBalance(){



try{



let player =
Storage.getPlayer();






if(!CONFIG.API_URL)

return;






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

catch(e){



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

updateScreen();




if(typeof drawUpgrades==="function")

drawUpgrades();
