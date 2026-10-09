// =====================================
// URALcoin APP v1
// Main Logic
// =====================================



let player = null;






// =====================================
// LOAD PLAYER
// =====================================


function loadPlayer(){


player = Storage.getPlayer();




if(!player)

return;



updateUI();



}









// =====================================
// UPDATE INTERFACE
// =====================================


function updateUI(){



if(!player)

return;





let balance =

document.getElementById(

"balance"

);





if(balance){



balance.innerText =

Math.floor(

player.balance || 0

);



}






let power =

document.getElementById(

"clickPower"

);





if(power){



power.innerText =

player.click_power || 0.01;



}







let second =

document.getElementById(

"secondPower"

);






if(second){



second.innerText =

player.second_power || 0;



}






}



window.updateUI = updateUI;









// =====================================
// CLICK BUTTON
// =====================================


function clickCoin(){



if(!player)

return;





fetch(

CONFIG.API_URL+"/click",

{


method:"POST",


headers:{


"Content-Type":

"application/json"


},


body:JSON.stringify({


id:String(player.id)


})


}

);








player.balance +=

player.click_power;



Storage.savePlayer(

player

);



updateUI();






}









// =====================================
// NAVIGATION
// =====================================


function navigation(){



document

.querySelectorAll(".nav")

.forEach(btn=>{





btn.onclick=()=>{





let page =

btn.dataset.page;







document

.querySelectorAll(".page")

.forEach(p=>{


p.classList.remove(

"active"

);


});







document

.getElementById(page)

.classList.add(

"active"

);








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





};




});





}









// =====================================
// NEW ROULETTE
// =====================================


function newRoulette(){



let button =

document.getElementById(

"openRoulette"

);






if(button){



button.onclick=()=>{



document

.querySelectorAll(".page")

.forEach(p=>{


p.classList.remove(

"active"

);


});






document

.getElementById(

"roulette"

)

.classList.add(

"active"

);








document

.querySelectorAll(".nav")

.forEach(n=>{


n.classList.remove(

"active"

);


});





let nav =

document.querySelector(

'[data-page="roulette"]'

);





if(nav)

nav.classList.add(

"active"

);



};




}



}









// =====================================
// START
// =====================================


document.addEventListener(

"DOMContentLoaded",

()=>{



navigation();



newRoulette();



loadPlayer();






let click =

document.getElementById(

"clickButton"

);






if(click){



click.onclick=

clickCoin;



}





});
