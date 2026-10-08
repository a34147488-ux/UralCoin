// ===================================
// URALcoin WINTER EFFECTS v2
// Angry Santa + Fast Click Bonus
// ===================================


let clickHistory = [];




// проверка скорости кликов

function registerFastClick(){


const now = Date.now();



clickHistory.push(now);




clickHistory = clickHistory.filter(

time =>

now - time < 2000

);




// 20 кликов за 2 секунды

if(clickHistory.length >= 20){


showAngrySanta();


clickHistory = [];


}



}






// появление Санты

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




// шанс бонуса 30%

if(Math.random() < 0.3){


giveSantaBonus();


}



}






// бонус от Санты

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

"+"

+

bonus

+

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








// подключаемся к кнопке клика

document.addEventListener(

"DOMContentLoaded",

()=>{



const button = document.getElementById(
"clickButton"
);





if(button){


button.addEventListener(

"click",

()=>{


registerFastClick();



}

);



}



});
