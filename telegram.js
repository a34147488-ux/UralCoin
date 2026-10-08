const tg = window.Telegram.WebApp;


tg.ready();

tg.expand();



// Получаем пользователя Telegram

const user = tg.initDataUnsafe.user;



if(user){


    const name = document.querySelector(".top h1");


    if(name){

        name.innerHTML = 
        "UralCoin";

    }



    console.log("Telegram user:", user);



    localStorage.setItem(
        "telegram_id",
        user.id
    );


    localStorage.setItem(
        "telegram_name",
        user.first_name
    );



}
