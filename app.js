// ===================================
// URALcoin APP v21
// Main Controller
// Roulette Support
// ===================================


let appPlayer = null;




async function startApp(){


appPlayer = Storage.getPlayer();



if(typeof initTelegram === "function"){

await initTelegram();

}




appPlayer = Storage.getPlayer();





if(
window.API &&
API.syncUser
){


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
"SERVER SYNC ERROR",
e
);


}


}






updateScreen();


initNavigation();


initClick();





if(
typeof drawUpgrades==="function"
){

drawUpgrades();

}




}









function initNavigation(){



document
.querySelectorAll(".nav")
.forEach(button=>{





button.onclick=function(){



let page=this.dataset.page;





document
.querySelectorAll(".page")
.forEach(item=>{


item.classList.remove(
"active"
);


});





let target =
document.getElementById(page);





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





this.classList.add(
"active"
);








if(
page==="tops" &&
typeof loadTop==="function"
){


loadTop();


}








if(
page==="roulette" &&
typeof startRoulette==="function"
){


startRoulette();


}







if(
page==="more" &&
typeof drawUpgrades==="function"
){


drawUpgrades();


}



};





});



}









function initClick(){



const button =

document.getElementById(
"clickButton"
);





if(!button)

return;





button.onclick=function(){



let player=

Storage.getPlayer();





player.balance =

Number(player.balance || 0)

+

Number(player.clickPower || 0.01);






Storage.savePlayer(player);






updateScreen();






if(
window.API &&
API.syncBalance
){

API.syncBalance();

}



};




}









function updateScreen(){



let player=

Storage.getPlayer();






let balance=

document.getElementById(
"balance"
);



if(balance){


balance.innerText=

Number(player.balance || 0)

.toFixed(3)

.replace(".",",");


}





let power=

document.getElementById(
"clickPower"
);



if(power){


power.innerText=

Number(player.clickPower || 0)

.toFixed(3)

.replace(".",",");


}






let crystal=

document.getElementById(
"crystals"
);



if(crystal){


crystal.innerText=

player.crystals || 0;


}





let second=

document.getElementById(
"secondPower"
);



if(second){


second.innerText=

player.autoPower || 0;


}




}





window.updateScreen=

updateScreen;







document.addEventListener(

"DOMContentLoaded",

()=>{


startApp();


}

);
