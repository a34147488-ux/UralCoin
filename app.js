let balance = Number(localStorage.getItem("balance")) || 0;

let clickPower = Number(localStorage.getItem("clickPower")) || 0.01;


let level = Number(localStorage.getItem("level")) || 1;



const coin = document.querySelector(".coin");

const balanceText = document.querySelector(".balance");

const powerText = document.querySelector(".stats span");





function updateScreen(){


    balanceText.innerHTML =
    balance.toFixed(2) + " U";



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


    localStorage.setItem(
        "level",
        level
    );

}






// клик по монете


coin.addEventListener("click",()=>{


    balance += clickPower;


    updateScreen();


});








// улучшения


const upgradeButtons =
document.querySelectorAll(".upgrade-card button");




upgradeButtons.forEach(button=>{


button.addEventListener("click",()=>{



    let price =
    Number(button.dataset.price);



    let power =
    Number(button.dataset.power);




    if(balance >= price){



        balance -= price;



        clickPower += power;



        level++;



        button.innerHTML =
        "Куплено";



        button.disabled=true;



        updateScreen();



    }else{


        alert(
        "Недостаточно U"
        );


    }



});



});








// переключение страниц


function openPage(page,btn){



document.querySelectorAll(".page")
.forEach(p=>{

p.classList.remove("active");

});



document.getElementById(page)
.classList.add("active");





document.querySelectorAll("nav button")
.forEach(b=>{

b.classList.remove("active");

});



btn.classList.add("active");



}







updateScreen();
