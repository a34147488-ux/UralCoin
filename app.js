// ===================================
// URALcoin APP v10
// Click + Auto + Upgrades + Navigation
// ===================================



let player =
Storage.getPlayer();






// ===============================
// FORMAT
// ===============================


function formatNumber(value){


return Number(value || 0)
.toFixed(3)
.replace(".",",");


}








// ===============================
// SCREEN UPDATE
// ===============================


function updateScreen(){


player =
Storage.getPlayer();




let balance =
document.getElementById("balance");



let clickPower =
document.getElementById("clickPower");



let secondPower =
document.getElementById("secondPower");



let friends =
document.getElementById("friendsCount");





if(balance)

balance.innerText =
formatNumber(player.balance);




if(clickPower)

clickPower.innerText =
formatNumber(player.clickPower);




if(secondPower)

secondPower.innerText =
formatNumber(player.autoPower / 60);




if(friends)

friends.innerText =
player.friends || 0;



renderUpgrades();


}









// ===============================
// SYNC
// ===============================


async function syncBalance(){


try{


player =
Storage.getPlayer();



await fetch(

CONFIG.API_URL + "/sync",

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
"SYNC ERROR",
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



clickButton.onclick = ()=>{


player =
Storage.getPlayer();



player.balance +=
Number(player.clickPower);




Storage.savePlayer(player);




showClickAnimation(
player.clickPower
);



updateScreen();



syncBalance();



};



}









// ===============================
// + U EFFECT
// ===============================



function showClickAnimation(value){


let div =
document.createElement("div");



div.className =
"click-number";



div.innerText =
"+"+
formatNumber(value)+
" U";



document.body.appendChild(div);



setTimeout(()=>{

div.remove();

},800);



}









// ===============================
// AUTO INCOME
// ===============================



setInterval(()=>{


player =
Storage.getPlayer();



if(player.autoPower > 0){


player.balance +=
Number(player.autoPower)/60;



Storage.savePlayer(player);


updateScreen();


}



},1000);









// ===============================
// UPGRADES
// ===============================


function renderUpgrades(){



document
.querySelectorAll(".upgrade-buy")
.forEach(button=>{



let name =
button.dataset.upgrade;



let level =
Storage.getUpgradeLevel(name);



let data =
Storage.getUpgrades()[name];



let price =
data.price *
(level+1);





button.innerText =

price+
" U";





});



}









document
.querySelectorAll(".upgrade-buy")
.forEach(button=>{


button.onclick = ()=>{



let name =
button.dataset.upgrade;



let result =
Storage.buyUpgrade(name);





if(!result){


alert(
"Недостаточно U"
);


return;


}




updateScreen();



syncBalance();



};



});









// ===============================
// MENU
// ===============================



document
.querySelectorAll(".nav")
.forEach(button=>{



button.onclick = ()=>{



let page =
button.dataset.page;





document
.querySelectorAll(".page")
.forEach(item=>{


item.classList.remove(
"active"
);


});





let target =
document.getElementById(page);



if(target)

target.classList.add(
"active"
);







document
.querySelectorAll(".nav")
.forEach(btn=>{

btn.classList.remove(
"active"
);


});





button.classList.add(
"active"
);



};



});









// ===============================
// START
// ===============================


updateScreen();



setInterval(
syncBalance,
10000
);
