// ===================================
// URALcoin APP v15.1
// Click + Server Balance Sync Fix
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
// UPDATE SCREEN
// ===============================


function updateScreen(){


player =
Storage.getPlayer();




let balance =
document.getElementById(
"balance"
);



let power =
document.getElementById(
"clickPower"
);



let friends =
document.getElementById(
"friendsCount"
);



let second =
document.getElementById(
"secondPower"
);





if(balance)

balance.innerText =
formatNumber(
player.balance
);




if(power)

power.innerText =
formatNumber(
player.clickPower
);





if(friends)

friends.innerText =
player.friends || 0;




if(second)

second.innerText =
formatNumber(
player.autoPower
);



}









// ===============================
// SERVER SYNC
// ===============================


async function syncBalance(){



player =
Storage.getPlayer();




if(!player.id)

return;






try{



let response =
await fetch(

CONFIG.API_URL+"/sync",

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},


body:JSON.stringify({

id:String(player.id),

balance:Number(player.balance || 0)

})


}

);





let data =
await response.json();



console.log(
"SYNC",
data
);



}

catch(e){


console.log(
"SYNC ERROR",
e
);



}



}



window.syncBalance =
syncBalance;









// ===============================
// CLICK
// ===============================


const clickButton =
document.getElementById(
"clickButton"
);






if(clickButton){



clickButton.onclick=()=>{



player =
Storage.getPlayer();





player.balance +=

Number(
player.clickPower
);






Storage.savePlayer(
player
);





updateScreen();





syncBalance();





showClickAnimation(
player.clickPower
);



};



}









// ===============================
// CLICK EFFECT
// ===============================


function showClickAnimation(value){


let text =
document.createElement(
"div"
);



text.className =
"click-number";



text.innerText =
"+"+
formatNumber(value)+
" U";



document.body.appendChild(text);





setTimeout(()=>{


text.remove();


},800);



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




Storage.savePlayer(
player
);



updateScreen();



syncBalance();



}



},1000);









// ===============================
// PERIOD SYNC
// ===============================


setInterval(

syncBalance,

5000

);









// ===============================
// MENU
// ===============================


document

.querySelectorAll(
".nav"
)

.forEach(button=>{



button.onclick=()=>{



let page =
button.dataset.page;





document

.querySelectorAll(
".page"
)

.forEach(p=>{


p.classList.remove(
"active"
);


});






let target =
document.getElementById(
page
);



if(target)

target.classList.add(
"active"
);






document

.querySelectorAll(
".nav"
)

.forEach(b=>{


b.classList.remove(
"active"
);


});





button.classList.add(
"active"
);




};



});









updateScreen();
