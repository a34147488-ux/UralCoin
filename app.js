// ===================================
// URALcoin APP v6
// Click + Auto + Navigation
// ===================================



let player =
Storage.getPlayer();






// ===============================
// Формат чисел
// ===============================


function formatNumber(value){


return Number(value || 0)

.toFixed(3)

.replace(".",",");


}








// ===============================
// Обновление экрана
// ===============================


function updateScreen(){



player =
Storage.getPlayer();





const balance =

document.getElementById(
"balance"
);




const clickPower =

document.getElementById(
"clickPower"
);




const autoPower =

document.getElementById(
"autoPower"
);





const friends =

document.getElementById(
"friendsCount"
);







if(balance){

balance.innerText =
formatNumber(
player.balance
);

}






if(clickPower){


clickPower.innerText =

formatNumber(
player.clickPower
);



}







if(autoPower){


autoPower.innerText =

formatNumber(
player.autoPower / 60
);



}







if(friends){


friends.innerText =

player.friends || 0;


}




}









// ===============================
// Серверная синхронизация
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
// КЛИК
// ===============================


const clickButton =

document.getElementById(
"clickButton"
);





if(clickButton){



clickButton.onclick = ()=>{



player =
Storage.getPlayer();





const power =

Number(
player.clickPower
);





player.balance += power;






Storage.savePlayer(
player
);






if(window.ClickEffects){


ClickEffects.show(power);



}






updateScreen();




syncBalance();





};



}









// ===============================
// АВТОДОХОД
// ===============================



setInterval(()=>{



player =
Storage.getPlayer();






if(
player.autoPower > 0
){



player.balance +=

Number(
player.autoPower
)
/
60;






Storage.savePlayer(
player
);




updateScreen();



}



},1000);











// ===============================
// СИНХРОНИЗАЦИЯ
// ===============================


setInterval(

syncBalance,

5000

);









// ===============================
// УЛУЧШЕНИЯ
// ===============================


document

.querySelectorAll(

".upgrade-card button"

)

.forEach(button=>{



button.onclick = ()=>{





player =
Storage.getPlayer();






const price =

Number(
button.dataset.price
);




const type =

button.dataset.type;





const value =

Number(
button.dataset.value
);







if(player.balance < price){



alert(
"Недостаточно U"
);



return;


}






player.balance -= price;







if(type==="click"){


player.clickPower += value;


}





if(type==="auto"){


player.autoPower += value;


}






Storage.savePlayer(
player
);






updateScreen();




syncBalance();





button.innerText =
"Куплено";



button.disabled=true;





};




});









// ===============================
// НИЖНЕЕ МЕНЮ
// ===============================


document

.querySelectorAll(

".nav"

)

.forEach(btn=>{



btn.onclick = ()=>{



const page =

btn.dataset.page;





document

.querySelectorAll(

".page"

)

.forEach(p=>{


p.classList.remove(
"active"
);



});







const target =

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







btn.classList.add(
"active"
);




};



});







updateScreen();
