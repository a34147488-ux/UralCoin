// ===================================
// URALcoin WINTER EFFECTS v3
// CSS Santa + Snow Bonus
// ===================================


let clickHistory = [];





// отслеживание быстрых кликов

function registerFastClick(){


const now = Date.now();



clickHistory.push(now);





clickHistory = clickHistory.filter(

time =>

now - time < 2000

);





// 10 быстрых кликов для проверки


if(clickHistory.length >= 10){


showAngrySanta();


clickHistory = [];


}



}








// запуск Санты

function showAngrySanta(){



const santa = document.getElementById(
"angrySanta"
);




if(!santa)

return;





santa.classList.remove(
"show"
);





void santa.offsetWidth;





santa.classList.add(
"show"
);






// шанс бонуса

if(Math.random() < 0.3){


giveSantaBonus();


}



}








// бонус Санты

function giveSantaBonus(){



let player = Storage.getPlayer();





const bonus =

Math.floor(

Math.random() * 400

) + 100;






player.balance += bonus;






Storage.savePlayer(player);







const effect = document.getElementById(
"bonusEffect"
);





if(effect){



effect.innerText =

"+" +

bonus +

" U";





effect.classList.remove(
"show"
);




void effect.offsetWidth;



effect.classList.add(
"show"
);



}







if(typeof updateScreen === "function"){


updateScreen();


}






if(typeof syncBalance === "function"){


syncBalance();


}



}









// подключение к кнопке

document.addEventListener(

"DOMContentLoaded",

()=>{



const clickButton = document.getElementById(
"clickButton"
);





if(clickButton){



clickButton.addEventListener(

"click",

()=>{


registerFastClick();



}

);



}



});
