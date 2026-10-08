// UralCoin v2
// Главная механика приложения


let player = Storage.getPlayer();





function formatNumber(value){

return Number(value)
.toFixed(3)
.replace(".", ",");

}








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









// КНОПКА КЛИКА



const clickButton =
document.getElementById(
"clickButton"
);






if(clickButton){



clickButton.addEventListener(
"click",
()=>{



player =
Storage.getPlayer();



player.balance +=
player.clickPower;



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









// АНИМАЦИЯ +U



function showClickAnimation(value){



let text =
document.createElement(
"div"
);



text.className =
"click-number";



text.innerText =
"+"+
formatNumber(value)
+
" U";





document.body.appendChild(
text
);





setTimeout(()=>{


text.remove();



},800);



}












// АВТОКЛИКЕР



setInterval(()=>{



player =
Storage.getPlayer();





if(
player.autoPower > 0
){



player.balance +=

player.autoPower / 60;



Storage.savePlayer(
player
);



updateScreen();



}



},1000);











// ПОКУПКА УЛУЧШЕНИЙ



document
.querySelectorAll(
".upgrade-card button"
)
.forEach(
(button)=>{



button.addEventListener(
"click",
()=>{





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







if(type === "click"){



player.clickPower +=
value;



}







if(type === "auto"){



player.autoPower +=
value;



}







Storage.savePlayer(
player
);






button.innerText =
"Куплено";


button.disabled =
true;





updateScreen();



}

);



});












// ПЕРЕКЛЮЧЕНИЕ ОСНОВНЫХ ВКЛАДОК



document
.querySelectorAll(
".nav"
)
.forEach(
(button)=>{



button.addEventListener(
"click",
()=>{



const page =
button.dataset.page;





document
.querySelectorAll(
".page"
)
.forEach(
(item)=>{


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
.forEach(
(btn)=>{


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









updateScreen();
