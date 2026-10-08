let balance = 0;

let clickPower = 0.01;



const balanceElement = document.querySelector(".balance");

const coin = document.querySelector(".coin");





// Клик по монете U

coin.addEventListener("click", function(){


    balance += clickPower;


    updateBalance();



});





function updateBalance(){


    balanceElement.innerHTML = 
    balance.toFixed(2) + " U";


}





// переключение вкладок


function openPage(page, button){


    let pages = document.querySelectorAll(".page");


    pages.forEach(function(item){

        item.classList.remove("active");

    });



    document.getElementById(page)
    .classList.add("active");





    let buttons = document.querySelectorAll("nav button");


    buttons.forEach(function(item){

        item.classList.remove("active");

    });



    button.classList.add("active");

}
