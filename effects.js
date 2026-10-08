// ===================================
// URALcoin WINTER EFFECTS v2
// Angry Santa + Fast Click Bonus
// ===================================


let clickHistory = [];





function registerFastClick(){


const now = Date.now();


clickHistory.push(now);





clickHistory = clickHistory.filter(

time =>

now - time < 2000

);





if(clickHistory.length >= 20){


showAngrySanta();


clickHistory = [];


}



}








function showAngrySanta(){


const santa =

document.getElementById(
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





if(Math.random() < 0.3){


giveSantaBonus();


}



}








function giveSantaBonus(){



const player = Storage.getPlayer();





const bonus =

Math.floor(

Math.random()*400

)+100;






player.balance += bonus;






Storage.savePlayer(player);







const effect =

document.getElementById(
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








document.addEventListener(

"DOMContentLoaded",

()=>{



const button =

document.getElementById(
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
