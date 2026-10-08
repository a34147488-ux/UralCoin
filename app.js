// ===================================
// URALcoin APP v3
// Click + Balance Sync
// ===================================



let player = Storage.getPlayer();





function formatNumber(value){


return Number(value || 0)

.toFixed(3)

.replace(".", ",");


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







if(balance){



balance.innerText =

formatNumber(

player.balance

);



}





if(power){



power.innerText =

formatNumber(

player.clickPower

);



}



}









// ================================
// Синхронизация с сервером
// ================================



async function syncBalance(){



try{



player = Storage.getPlayer();







await fetch(

CONFIG.API_URL + "/balance",

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






console.log(

"Баланс отправлен"

);





}

catch(error){



console.log(

"Ошибка синхронизации",

error

);



}



}









// ================================
// Кнопка клика
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






Storage.savePlayer(

player

);






showClickAnimation(

player.clickPower

);





updateScreen();





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

"+"

+

formatNumber(value)

+

" U";







document.body.appendChild(

text

);







setTimeout(

()=>{


text.remove();



},

800

);



}









// ================================
// Автокликер
// ================================



setInterval(

()=>{



player = Storage.getPlayer();






if(player.autoPower > 0){



player.balance +=

Number(player.autoPower) / 60;






Storage.savePlayer(

player

);





updateScreen();



}



},

1000

);









// ================================
// Отправка баланса
// ================================



setInterval(

syncBalance,

5000

);









// ================================
// Улучшения
// ================================



document

.querySelectorAll(

".upgrade-card button"

)

.forEach(

button=>{



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







if(type==="click"){



player.clickPower += value;



}








if(type==="auto"){



player.autoPower += value;



}







Storage.savePlayer(

player

);








button.innerText =

"Куплено";





button.disabled = true;







updateScreen();





}

);



});









updateScreen();
