let balance =
Number(localStorage.getItem("balance")) || 0;


let clickPower =
Number(localStorage.getItem("clickPower")) || 0.01;



const balanceElement =
document.getElementById("balance");


const powerElement =
document.getElementById("clickPower");



const coin =
document.getElementById("coin");






function updateBalance(){


if(balanceElement){

balanceElement.innerText =
balance.toFixed(2);

}



if(powerElement){

powerElement.innerText =
clickPower.toFixed(2);

}



localStorage.setItem(
"balance",
balance
);



localStorage.setItem(
"clickPower",
clickPower
);



}








/* КЛИК ПО U */


if(coin){


coin.addEventListener(
"click",
()=>{


balance += clickPower;


updateBalance();



}
);


}









/* МЕНЮ */


const menuButtons =
document.querySelectorAll(
".bottom-menu button"
);



const pages =
document.querySelectorAll(
".page"
);



menuButtons.forEach(
button=>{


button.addEventListener(
"click",
()=>{


let target =
button.dataset.page;




pages.forEach(
page=>{

page.classList.remove(
"active"
);

});



document
.getElementById(target)
.classList.add(
"active"
);



menuButtons.forEach(
btn=>{

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









/* УЛУЧШЕНИЯ */


let bought =
JSON.parse(
localStorage.getItem("upgrades")
)
|| [];





const upgradeButtons =
document.querySelectorAll(
".upgrade button"
);



upgradeButtons.forEach(
(button,index)=>{


button.addEventListener(
"click",
()=>{


if(
bought.includes(index)
){

return;

}



let price =
Number(
button.dataset.price
);



let power =
Number(
button.dataset.power
);




if(balance >= price){



balance -= price;


clickPower += power;




bought.push(index);



localStorage.setItem(
"upgrades",
JSON.stringify(bought)
);



button.innerText =
"Куплено";


button.disabled=true;



updateBalance();



}

else{


alert(
"Недостаточно U"
);


}



}
);



});









/* ВОССТАНОВЛЕНИЕ КУПЛЕННЫХ */


upgradeButtons.forEach(
(button,index)=>{


if(
bought.includes(index)
){


button.innerText =
"Куплено";


button.disabled=true;


}


});









updateBalance();
