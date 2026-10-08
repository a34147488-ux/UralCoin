// ===================================
// URALcoin WINTER EFFECTS v4
// Santa + Small Bonus
// ===================================


let clickHistory = [];





function registerFastClick(){


const now = Date.now();



clickHistory.push(now);





clickHistory = clickHistory.filter(

time =>

now - time < 2000

);





if(clickHistory.length >= 10){


showAngrySanta();


clickHistory = [];


}



}









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






if(Math.random() < 0.25){


giveSantaBonus();


}



}









function giveSantaBonus(){



let player = Storage.getPlayer();





// бонус от 0.050 до 0.500 U


const bonus =

Number(

(

Math.random()

*

0.450

+

0.050

)

.toFixed(3)

);






player.balance += bonus;






Storage.savePlayer(player);







const effect = document.getElementById(
"bonusEffect"
);






if(effect){



effect.innerText =

"+"

+

bonus.toFixed(3)

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
