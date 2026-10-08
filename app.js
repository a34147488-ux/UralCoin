const tg = window.Telegram?.WebApp;


if(tg){

tg.ready();

tg.expand();

tg.setHeaderColor("#ffffff");

tg.setBackgroundColor("#ffffff");

}




let balance =
Number(localStorage.getItem("balance")) || 0;


let clickPower =
Number(localStorage.getItem("clickPower")) || 0.01;




const balanceEl =
document.getElementById("balance");


const powerEl =
document.getElementById("clickPower");



const clickButton =
document.getElementById("clickButton");







function update(){


if(balanceEl){

balanceEl.innerHTML =
balance.toFixed(2);

}



if(powerEl){

powerEl.innerHTML =
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








// КЛИК U


if(clickButton){


clickButton.onclick = ()=>{


balance += clickPower;


update();


};



}









// TELEGRAM ПРОФИЛЬ


if(tg){



let user =
tg.initDataUnsafe?.user;



if(user){



document.getElementById("username").innerHTML =
user.first_name;



let avatar =
document.getElementById("avatar");



if(user.photo_url){


avatar.src =
user.photo_url;


}



let circle =
document.querySelector(".avatar-circle");


if(circle){

circle.innerHTML =
user.first_name[0];

}



localStorage.setItem(
"user_id",
user.id
);



}




}









// РЕФЕРАЛЬНАЯ ССЫЛКА



function createRef(){



let id =
localStorage.getItem("user_id");



if(!id){

id="123456";

}




let link =
`https://t.me/uralscoin_bot?start=${id}`;



let input =
document.getElementById("refLink");



if(input){

input.value = link;

}



}



createRef();








// КОПИРОВАНИЕ ССЫЛКИ


let copy =
document.getElementById("copyRef");



if(copy){


copy.onclick=()=>{


let input =
document.getElementById("refLink");



navigator.clipboard.writeText(
input.value
);



alert(
"Ссылка скопирована"
);



};



}








// ПЕРЕКЛЮЧЕНИЕ МЕНЮ



document
.querySelectorAll(".menu button")
.forEach(btn=>{


btn.onclick=()=>{



let page =
btn.dataset.page;



document
.querySelectorAll(".page")
.forEach(p=>{

p.classList.remove("active");

});




document
.getElementById(page)
.classList.add("active");





document
.querySelectorAll(".menu button")
.forEach(b=>{

b.classList.remove("active");

});



btn.classList.add("active");



};



});









// УЛУЧШЕНИЯ


let upgrades =
document.querySelectorAll(".upgrade button");



let levels =
JSON.parse(
localStorage.getItem("levels")
) || [];




upgrades.forEach((btn,index)=>{



btn.onclick=()=>{



let prices=[

10,
100,
500,
2500,
10000

];



let powers=[

0.01,
0.05,
0.10,
0.50,
1

];





if(levels.includes(index)){


return;


}




if(balance >= prices[index]){



balance -= prices[index];


clickPower += powers[index];



levels.push(index);



localStorage.setItem(
"levels",
JSON.stringify(levels)
);



btn.innerHTML =
"Куплено";



btn.disabled=true;



update();



}else{


alert(
"Недостаточно U"
);



}



};



});






update();
