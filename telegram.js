// =================================
// URALcoin Telegram WebApp v5
// Связь Telegram + Storage
// =================================



const tg = window.Telegram.WebApp;



// запуск Telegram Mini App

tg.ready();

tg.expand();




// цвета Telegram

tg.setHeaderColor("#090414");

tg.setBackgroundColor("#090414");







const telegramUser =

tg.initDataUnsafe?.user;








if(telegramUser){





// сохраняем ID отдельно

localStorage.setItem(

"telegram_id",

String(telegramUser.id)

);







// передаем данные в единое хранилище

Storage.setTelegramUser({

id:

telegramUser.id,


first_name:

telegramUser.first_name,


username:

telegramUser.username,


photo_url:

telegramUser.photo_url



});








// аватар


const avatar =

document.getElementById(

"userAvatar"

);



const letter =

document.getElementById(

"avatarLetter"

);







if(
avatar &&
telegramUser.photo_url
){



avatar.src =

telegramUser.photo_url;



avatar.style.display =

"block";






if(letter){


letter.style.display =

"none";


}



}






else if(letter){



letter.innerText =

(

telegramUser.first_name ||

"U"

)

.charAt(0)

.toUpperCase();



}









// проверяем реферальную ссылку Telegram



const startParam =

tg.initDataUnsafe?.start_param;





if(startParam){



let player =

Storage.getPlayer();





if(

!player.referrer &&

String(startParam)!==String(player.id)

){



Storage.setReferrer(

startParam

);



}



}





}







else{



// если открыт вне Telegram



let player =

Storage.getPlayer();






if(!player.id){



player.id =

"guest";



Storage.savePlayer(player);



}



}
