// ===================================
// URALcoin APP v5
// Click + Sync + Navigation
// ===================================


let player = Storage.getPlayer();




// ================================
// Формат чисел
// ================================


function formatNumber(value){

return Number(value || 0)
.toFixed(3)
.replace(".",",");

}







// ================================
// Обновление экрана
// ================================


function updateScreen(){


player = Storage.getPlayer();



const balance =

document.getElementById(
"balance"
);



const power =

document.getElementById(
"clickPower"
);




const friends =

document.getElementById(
"friendsCount"
);





if(balance){

balance.innerText =
formatNumber(player.balance);

}




if(power){

power.innerText =
formatNumber(player.clickPower);

}




if(friends){

friends.innerText =
player.friends || 0;

}



}









// ================================
// Синхронизация с сервером
// ================================


async function syncBalance(){


try{


player = Storage.getPlayer();



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

catch(error){


console.log(
"SYNC ERROR",
error
);



}



}









// ================================
// Главная кнопка
// ================================


const clickButton =

document.getElementById(
"clickButton"
);




if(clickButton){


clickButton.addEventListener(

"click",

()=>{


player = Storage.getPlayer();



player.balance +=

Number(player.clickPower);




Storage.savePlayer(player);




showClickAnimation(
player.clickPower
);



updateScreen();



syncBalance();



}


);



}









// ================================
// Анимация +U
// ================================


function showClickAnimation(value){


const text =

document.createElement(
"div"
);



text.className =
"click-number";



text.innerText =

"+" +
formatNumber(value)
+
" U";





document.body.appendChild(text);




setTimeout(()=>{


text.remove();



},800);



}









// ================================
// Автоклик
// ================================


setInterval(()=>{


player = Storage.getPlayer();



if(player.autoPower > 0){


player.balance +=

Number(player.autoPower) / 60;



Storage.savePlayer(player);



updateScreen();



}



},1000);









// ================================
// Синхронизация каждые 5 секунд
// ================================


setInterval(

syncBalance,

5000

);









// ================================
// Покупка улучшений
// ================================


document

.querySelectorAll(
".upgrade-card button"
)

.forEach(button=>{


button.addEventListener(

"click",

()=>{


player = Storage.getPlayer();




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






if(type === "click"){


player.clickPower += value;


}





if(type === "auto"){


player.autoPower += value;


}





Storage.savePlayer(player);



updateScreen();



syncBalance();





button.innerText =
"Куплено";



button.disabled = true;



}



);



});









// ================================
// Нижнее меню
// ================================


document

.querySelectorAll(
".nav"
)

.forEach(button=>{


button.addEventListener(

"click",

()=>{



const page =

button.dataset.page;






document

.querySelectorAll(
".page"
)

.forEach(item=>{


item.classList.remove(
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

.forEach(btn=>{


btn.classList.remove(
"active"
);


});






button.classList.add(
"active"
);




}



);



});









// старт


updateScreen();
