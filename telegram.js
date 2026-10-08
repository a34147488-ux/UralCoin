const tg = window.Telegram.WebApp;



// запускаем Telegram WebApp

tg.ready();

tg.expand();




// цвета Telegram

tg.setHeaderColor("#ffffff");

tg.setBackgroundColor("#ffffff");





// получаем пользователя


const user =
tg.initDataUnsafe?.user;





if(user){



// сохраняем ID


localStorage.setItem(
"user_id",
user.id
);




// имя


const name =
document.getElementById(
"nickname"
);



if(name){


name.innerText =
user.first_name || "Игрок";


}







// аватар


const img =
document.getElementById(
"telegramAvatar"
);



const letter =
document.getElementById(
"avatarLetter"
);





if(
user.photo_url
){


img.src =
user.photo_url;



img.style.display =
"block";



if(letter){

letter.style.display =
"none";

}



}



else{


if(letter){

letter.innerText =
(user.first_name || "U")
.charAt(0)
.toUpperCase();


}



}



}





// если открыли не через Telegram

else{


localStorage.setItem(
"user_id",
"guest"
);



}
