// Подключение Telegram WebApp

const tg = window.Telegram.WebApp;


tg.ready();


tg.expand();



// Получаем пользователя Telegram

const user = tg.initDataUnsafe?.user;



if(user){


    const name = user.first_name || "Игрок";


    const avatar = document.querySelector(".avatar");


    const username = document.querySelector(".username");



    if(avatar){

        avatar.innerHTML = name[0].toUpperCase();

    }



    if(username){

        username.innerHTML = `

        <h2>${name}</h2>

        <p>UralCoin игрок</p>

        `;

    }


}
