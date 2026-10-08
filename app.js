// ===================================
// URALcoin APP v13
// Stable Core
// ===================================



let player = Storage.getPlayer();





function formatNumber(value){


return Number(value || 0)

.toFixed(3)

.replace(".",",");


}








function updateScreen(){



player = Storage.getPlayer();




const balance =

document.getElementById("balance");



const power =

document.getElementById("clickPower");



const friends =

document.getElementById("friendsCount");



const second =

document.getElementById("secondPower");



const crystals =

document.getElementById("crystals");






if(balance)

balance.innerText =

formatNumber(player.balance);





if(power)

power.innerText =

formatNumber(player.clickPower);






if(friends)

friends.innerText =

player.friends || 0;






if(second)

second.innerText =

formatNumber(player.autoPower);






if(crystals)

crystals.innerText =

player.crystals || 0;



}









// ===============================
// CLICK
// ===============================


const clickButton =

document.getElementById(

"clickButton"

);






if(clickButton){



clickButton.onclick = function(){



let player =

Storage.getPlayer();






player.balance +=

Number(player.clickPower);






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
// SYNC
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


"Content-Type":

"application/json"

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

"SYNC OFF"

);


}




}









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







setInterval(

syncBalance,

10000

);









// ===============================
// NAVIGATION
// ===============================



document

.querySelectorAll(".nav")

.forEach(btn=>{



btn.onclick=()=>{



const page =

btn.dataset.page;





document

.querySelectorAll(".page")

.forEach(p=>{


p.classList.remove("active");


});






const target =

document.getElementById(page);






if(target)

target.classList.add("active");







document

.querySelectorAll(".nav")

.forEach(b=>{


b.classList.remove("active");


});





btn.classList.add("active");





};




});









// ===============================
// AVATAR TELEGRAM
// ===============================


function updateAvatar(){



if(!window.Telegram)

return;






let user =

Telegram.WebApp.initDataUnsafe.user;






if(!user)

return;







Storage.updateTelegramProfile(user);







const img =

document.getElementById(

"userAvatar"

);







const letter =

document.getElementById(

"avatarLetter"

);






if(user.photo_url && img){



img.src=

user.photo_url;



img.style.display="block";






if(letter)

letter.style.display="none";



}





if(letter && user.first_name){



letter.innerText =

user.first_name

[0]

.toUpperCase();


}




}









// ===============================
// КНОПКИ ЕЩЁ
// ===============================



const promoOpen =

document.getElementById(

"promoOpen"

);



if(promoOpen){



promoOpen.onclick=()=>{



if(typeof openPromo==="function")

openPromo();



};

}




const historyOpen =

document.getElementById(

"historyOpen"

);



if(historyOpen){



historyOpen.onclick=()=>{



if(typeof openHistory==="function")

openHistory();



};

}





const apiOpen =

document.getElementById(

"apiOpen"

);



if(apiOpen){



apiOpen.onclick=()=>{



if(typeof openApi==="function")

openApi();



};

}









updateAvatar();

updateScreen();
