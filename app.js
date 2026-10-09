// ===================================
// URALcoin APP v18
// Telegram Sync + Buttons Fix
// ===================================


let player = null;




// ===============================
// START APP
// ===============================


async function startApp(){



player = Storage.getPlayer();




// создаём пользователя на сервере


if(
typeof API !== "undefined"
){


let serverUser = await API.syncUser();



if(serverUser){


player = {

...player,

...serverUser

};



Storage.savePlayer(player);



}



}






updateScreen();






initButtons();



}









// ===============================
// BUTTONS
// ===============================


function initButtons(){





const clickButton =
document.getElementById(
"clickButton"
);





if(clickButton){



clickButton.onclick = ()=>{



let p =
Storage.getPlayer();





let power =
Number(
p.clickPower || 0.01
);






p.balance =

Number(
p.balance || 0
)

+

power;







Storage.savePlayer(p);






updateScreen();






syncBalance();






};





}











// NAVIGATION


document

.querySelectorAll(".nav")

.forEach(btn=>{





btn.onclick = ()=>{



let page =
btn.dataset.page;






document

.querySelectorAll(".page")

.forEach(p=>{


p.classList.remove(
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

.forEach(n=>{


n.classList.remove(
"active"
);


});





btn.classList.add(
"active"
);






if(
page==="tops" &&
typeof loadTop==="function"
){


loadTop();


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









// ===============================
// SCREEN
// ===============================


function updateScreen(){



let p =
Storage.getPlayer();





let balance =
document.getElementById(
"balance"
);



if(balance){


balance.innerText =

Number(
p.balance || 0
)

.toFixed(3)

.replace(".",",");


}







let power =
document.getElementById(
"clickPower"
);



if(power){


power.innerText =

Number(
p.clickPower || 0
)

.toFixed(3)

.replace(".",",");


}






let second =
document.getElementById(
"secondPower"
);



if(second){


second.innerText =

Number(
p.autoPower || 0
);


}






let crystals =
document.getElementById(
"crystals"
);



if(crystals){


crystals.innerText =
p.crystals || 0;


}



}









// ===============================
// SERVER BALANCE
// ===============================


async function syncBalance(){



let p =
Storage.getPlayer();





try{


await fetch(

CONFIG.API_URL+"/sync",

{


method:"POST",


headers:{


"Content-Type":"application/json"


},



body:JSON.stringify({


id:String(p.id),


balance:Number(p.balance)


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











// START


document.addEventListener(

"DOMContentLoaded",

()=>{


startApp();


}

);
