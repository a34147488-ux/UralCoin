let balance = Number(localStorage.getItem("balance")) || 0;

let clickPower = Number(localStorage.getItem("clickPower")) || 0.01;

let upgradeLevel = Number(localStorage.getItem("upgradeLevel")) || 1;

let upgradePrice = Number(localStorage.getItem("upgradePrice")) || 10;



const balanceElement = document.querySelector(".balance");

const clickText = document.querySelector(".stats span");

const upgradeButton = document.querySelector(".upgrade-card button");

const upgradeTitle = document.querySelector(".upgrade-card h3");

const upgradeInfo = document.querySelector(".upgrade-card p");

const coin = document.querySelector(".coin");





function update(){

    balanceElement.innerHTML =
    balance.toFixed(2) + " U";


    clickText.innerHTML =
    "+" + clickPower.toFixed(2) + " U / клик";


    upgradeTitle.innerHTML =
    "Уровень " + upgradeLevel;


    upgradeInfo.innerHTML =
    "+" + clickPower.toFixed(2) + " U за клик";


    upgradeButton.innerHTML =
    upgradePrice.toFixed(0) + " U";


    localStorage.setItem("balance", balance);

    localStorage.setItem("clickPower", clickPower);

    localStorage.setItem("upgradeLevel", upgradeLevel);

    localStorage.setItem("upgradePrice", upgradePrice);

}





// клик по U

coin.addEventListener("click",()=>{


    balance += clickPower;


    update();


});





// покупка улучшения

upgradeButton.addEventListener("click",()=>{


    if(balance >= upgradePrice){


        balance -= upgradePrice;


        clickPower += 0.01;


        upgradeLevel++;


        upgradePrice *= 2;



        update();


    }

    else{


        alert("Недостаточно U");


    }


});






// меню


function openPage(page, button){


    document.querySelectorAll(".page")
    .forEach(p=>p.classList.remove("active"));



    document.getElementById(page)
    .classList.add("active");



    document.querySelectorAll("nav button")
    .forEach(b=>b.classList.remove("active"));



    button.classList.add("active");

}



update();
