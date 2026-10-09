// ===================================
// URALcoin APP v16.2
// Navigation + Stable Click
// ===================================


let player = null;




// ===============================
// NAVIGATION
// ===============================


function initNavigation(){


document.querySelectorAll(".nav")
.forEach(btn=>{


btn.addEventListener("click",()=>{


document.querySelectorAll(".page")
.forEach(page=>{


page.classList.remove("active");


});





let page = document.getElementById(
btn.dataset.page
);





if(page){


page.classList.add("active");


}






document.querySelectorAll(".nav")
.forEach(item=>{


item.classList.remove("active");


});





btn.classList.add("active");






if(btn.dataset.page==="tops"){



if(typeof loadTop==="function"){

loadTop();

}


}





if(btn.dataset.page==="more"){



if(typeof drawUpgrades==="function"){

drawUpgrades();

}


}





});



});



}









// ===============================
// LOAD USER
// ===============================


async function loadPlayer(){



player = Storage.getPlayer();






if(!player.id){

updateScreen();

return;


}





try{



let response = await fetch(

CONFIG.API_URL+
"/user/"+
player.id

);






let data = await response.json();






if(data){



player={

...player,

...data

};



Storage.savePlayer(player);



}







updateScreen();



}



catch(e){


console.log(

"USER LOAD ERROR",

e

);


}




}









// ===============================
// CLICK
// ===============================


function initClicker(){



const button =

document.getElementById(

"clickButton"

);






if(!button)

return;







button.onclick = function(){



let user = Storage.getPlayer();






let power =

Number(user.clickPower || 0.01);






user.balance =

Number(user.balance || 0)

+

power;







Storage.savePlayer(user);







updateScreen();







if(typeof syncBalance==="function"){


syncBalance();


}








if(typeof createClickEffect==="function"){


createClickEffect(power);


}








if(typeof registerClickEffect==="function"){


registerClickEffect();


}





};





}









// ===============================
// SERVER SYNC
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

catch(e){


console.log(e);


}



}









// ===============================
// SCREEN
// ===============================


function updateScreen(){



let user = Storage.getPlayer();






let balance =

document.getElementById(

"balance"

);



if(balance){


balance.innerText =

Number(user.balance || 0)

.toFixed(3)

.replace(".",",");


}







let power =

document.getElementById(

"clickPower"

);



if(power){


power.innerText =

Number(user.clickPower || 0)

.toFixed(3);


}







let auto =

document.getElementById(

"secondPower"

);



if(auto){


auto.innerText =

Number(user.autoPower || 0);


}



}









// ===============================
// START
// ===============================


document.addEventListener(

"DOMContentLoaded",

()=>{


initNavigation();


initClicker();


loadPlayer();


});





window.updateScreen = updateScreen;
window.syncBalance = syncBalance;
