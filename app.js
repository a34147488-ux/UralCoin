// ===================================
// URALcoin APP v21 FINAL
// Navigation + Click + NEW Roulette
// ===================================


let appPlayer = null;






// ===============================
// START APP
// ===============================


async function startApp(){



appPlayer = Storage.getPlayer();






if(typeof initTelegram==="function"){


await initTelegram();



}





appPlayer = Storage.getPlayer();







if(window.API && API.syncUser){



try{


let serverUser = await API.syncUser();




if(serverUser){



appPlayer={


...appPlayer,


...serverUser


};




Storage.savePlayer(appPlayer);



}



}

catch(e){



console.log(
"SYNC ERROR",
e
);



}



}







updateScreen();





initNavigation();





initClick();





initNewRouletteButton();






if(typeof drawUpgrades==="function"){


drawUpgrades();



}





}









// ===============================
// NAVIGATION
// ===============================


function openPage(page){



document

.querySelectorAll(".page")

.forEach(item=>{


item.classList.remove(
"active"
);



});








let target=document.getElementById(page);





if(target){



target.classList.add(
"active"
);



}








document

.querySelectorAll(".nav")

.forEach(btn=>{



btn.classList.remove(
"active"
);



});








let nav=document.querySelector(

'[data-page="'+page+'"]'

);






if(nav){



nav.classList.add(
"active"
);



}







if(page==="tops" && typeof loadTop==="function"){


loadTop();



}





if(page==="more" && typeof drawUpgrades==="function"){


drawUpgrades();



}



}








function initNavigation(){



document

.querySelectorAll(".nav")

.forEach(button=>{



button.onclick=function(){



openPage(

this.dataset.page

);



};



});



}









// ===============================
// NEW BUTTON
// ===============================


function initNewRouletteButton(){



let button=document.getElementById(

"newRouletteButton"

);





if(!button)

return;







button.onclick=function(){



openPage(

"roulette"

);



};




}









// ===============================
// CLICK
// ===============================


function initClick(){



let button=document.getElementById(

"clickButton"

);





if(!button)

return;







button.onclick=function(){



let player=

Storage.getPlayer();






player.balance=


Number(player.balance||0)

+

Number(player.clickPower||0.01);







Storage.savePlayer(player);







updateScreen();






if(window.API && API.syncBalance){



API.syncBalance();



}




};



}
