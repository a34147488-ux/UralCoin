// ===================================
// URALcoin APP v17
// Stable Buttons + Click Fix
// ===================================


let player = null;



function startApp(){


player = Storage.getPlayer();


updateScreen();



const clickButton =
document.getElementById("clickButton");



if(clickButton){


clickButton.onclick = async function(){


let p = Storage.getPlayer();



let power =
Number(p.clickPower || 0.01);



p.balance =
Number(p.balance || 0) + power;



Storage.savePlayer(p);



updateScreen();



if(typeof syncBalance==="function"){

syncBalance();

}



};



}





// ===============================
// NAVIGATION
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
.forEach(item=>{

item.classList.remove("active");

});



this.classList.add("active");





if(page==="tops" &&
typeof loadTop==="function"){

loadTop();

}





if(page==="more" &&
typeof drawUpgrades==="function"){

drawUpgrades();

}



};



});



}









function updateScreen(){


let p = Storage.getPlayer();



let balance =
document.getElementById("balance");



if(balance){

balance.innerText =
Number(p.balance || 0)
.toFixed(3)
.replace(".",",");

}



let power =
document.getElementById("clickPower");



if(power){

power.innerText =
Number(p.clickPower || 0)
.toFixed(3)
.replace(".",",");

}



let second =
document.getElementById("secondPower");



if(second){

second.innerText =
Number(p.autoPower || 0)
.toFixed(3)
.replace(".",",");

}



let crystals =
document.getElementById("crystals");



if(crystals){

crystals.innerText =
p.crystals || 0;

}



}






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

console.log(e);

}



}







document.addEventListener(

"DOMContentLoaded",

()=>{


startApp();


}

);
