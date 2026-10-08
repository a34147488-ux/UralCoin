// ===================================
// URALcoin APP v6
// Click + Auto + Sync + Upgrades
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
player.autoPower
);

}






const friends =
document.getElementById(
"friendsCount"
);





if(friends){

friends.innerText =
player.friends || 0;

}




}









// ===============================
// Синхронизация
// ===============================


async function syncBalance(){


try{


player =
Storage.getPlayer();





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






showClickAnimation(
player.clickPower
);





updateScreen();






syncBalance();



};



}









// ===============================
// +U Анимация
// ===============================



function showClickAnimation(value){



const div =
document.createElement(
"div"
);



div.className =
"click-number";



div.innerText =

"+"
+
formatNumber(value)
+
" U";





document.body.appendChild(
div
);






setTimeout(()=>{


div.remove();



},800);



}









// ===============================
// АВТОКЛИК
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
// ПОКУПКА УЛУЧШЕНИЙ
// ===============================



document

.querySelectorAll(

".upgrade-card button"

)

.forEach(button=>{





button.onclick=()=>{



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







if(
player.balance < price
){


alert(
"Недостаточно U"
);


return;


}








player.balance -= price;









if(
type==="click"
){


player.clickPower += value;


}







if(
type==="auto"
){


player.autoPower += value;


}







Storage.savePlayer(
player
);






button.innerText =
"Куплено";


button.disabled =
true;





updateScreen();



syncBalance();




};



});









// ===============================
// НАВИГАЦИЯ
// ===============================



document

.querySelectorAll(
".nav"
)

.forEach(btn=>{



btn.onclick=()=>{



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






if(target){


target.classList.add(
"active"
);


}







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









// ===============================
// ЗАПУСК
// ===============================


updateScreen();



setInterval(

syncBalance,

5000

);
