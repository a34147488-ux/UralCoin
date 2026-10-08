const tg = window.Telegram.WebApp;



// запуск Telegram приложения

tg.ready();

tg.expand();



// цвета Telegram

tg.setHeaderColor("#090414");

tg.setBackgroundColor("#090414");





const user =
tg.initDataUnsafe?.user;






if(user){



// сохраняем ID


localStorage.setItem(
"telegram_id",
user.id
);






// имя


const nickname =
document.querySelector(".brand");



if(nickname){

nickname.innerText =
"URALcoin";

}







// аватар


const avatar =
document.getElementById(
"userAvatar"
);



const letter =
document.getElementById(
"avatarLetter"
);







if(user.photo_url){



avatar.src =
user.photo_url;



avatar.style.display =
"block";



if(letter){

letter.style.display =
"none";

}



}



else{



if(letter){


letter.innerText =
(
user.first_name ||
"U"

)
.charAt(0)
.toUpperCase();


}


}








// сохраняем пользователя


let player =

JSON.parse(

localStorage.getItem(
"player"
)

)

|| {};





player.id =
user.id;



player.name =
user.first_name ||
"Игрок";



player.photo =
user.photo_url ||
"";





localStorage.setItem(

"player",

JSON.stringify(player)

);





}






else{


// если открыт не в Telegram


let player =

JSON.parse(

localStorage.getItem(
"player"
)

)

|| {};



if(!player.id){



player.id =
"guest";

player.name =
"Игрок";


localStorage.setItem(

"player",

JSON.stringify(player)

);



}



}
