let balance = Number(localStorage.getItem("balance")) || 0;

let clickPower = Number(localStorage.getItem("clickPower")) || 0.01;



const coin = document.querySelector(".coin");

const balanceText = document.querySelector(".balance");

const powerText = document.querySelector(".stats span");





function updateScreen(){


    if(balanceText){

        balanceText.innerHTML =
        balance.toFixed(2) + " U";

    }



    if(powerText){

        powerText.innerHTML =
        "+" + clickPower.toFixed(2) + " U / клик";

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






// КЛИК ПО КНОПКЕ U


if(coin){


coin.addEventListener("click",function(){


    balance += clickPower;


    updateScreen();


});


}








// УЛУЧШЕНИЯ


const upgrades =
document.querySelectorAll(".upgrade-card button");



upgrades.forEach(button=>{


button.onclick=function(){


let price =
Number(button.dataset.price);


let power =
Number(button.dataset.power);




if(balance >= price){



balance -= price;


clickPower += power;



button.innerHTML =
"Куплено";


button.disabled = true;



updateScreen();



}else{


alert(
"Недостаточно U"
);


}



};



});









// ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК


function openPage(page,btn){



document
.querySelectorAll(".page")
.forEach(item=>{

item.classList.remove("active");

});




let current =
document.getElementById(page);



if(current){

current.classList.add("active");

}




document
.querySelectorAll("nav button")
.forEach(item=>{

item.classList.remove("active");

});



if(btn){

btn.classList.add("active");

}



}







updateScreen();
