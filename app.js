let balance =
Number(localStorage.getItem("balance")) || 0;


let clickPower =
Number(localStorage.getItem("clickPower")) || 0.01;


let autoPower =
Number(localStorage.getItem("autoPower")) || 0;



const balanceEl =
document.getElementById("balance");


const powerEl =
document.getElementById("clickPower");



const clickButton =
document.getElementById("clickButton");







function formatNumber(num){


return num
.toFixed(3)
.replace(".",",");


}







function update(){


if(balanceEl){

balanceEl.innerText =
formatNumber(balance);

}



if(powerEl){

powerEl.innerText =
formatNumber(clickPower);

}



localStorage.setItem(
"balance",
balance
);



localStorage.setItem(
"clickPower",
clickPower
);



localStorage.setItem(
"autoPower",
autoPower
);



}










// КЛИК ПО U


if(clickButton){



clickButton.onclick = ()=>{


balance += clickPower;


showPlus(clickPower);



update();



};


}









// АНИМАЦИЯ +U


function showPlus(value){



let el =
document.createElement("div");



el.className =
"plus-animation";



el.innerText =
"+"+
formatNumber(value)
+
" U";



document.body.appendChild(el);



setTimeout(()=>{


el.remove();


},800);



}











// АВТОКЛИКЕР


setInterval(()=>{


if(autoPower>0){


balance += autoPower/60;


update();


}


},1000);











// МЕНЮ



document
.querySelectorAll(".nav")
.forEach(btn=>{


btn.onclick=()=>{



let id =
btn.dataset.page;



document
.querySelectorAll(".page")
.forEach(page=>{


page.classList.remove(
"active"
);


});




document
.getElementById(id)
.classList.add(
"active"
);






document
.querySelectorAll(".nav")
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









// УЛУЧШЕНИЯ



document
.querySelectorAll(".upgrade-card button")
.forEach(button=>{



button.onclick=()=>{



let price =
Number(
button.dataset.price
);



let type =
button.dataset.type;



let value =
Number(
button.dataset.value
);





if(balance < price){



alert(
"Недостаточно U"
);


return;


}







balance -= price;






if(type==="click"){



clickPower += value;



}




if(type==="auto"){



autoPower += value;



}






button.innerText =
"Куплено";


button.disabled=true;



update();



};



});









update();
