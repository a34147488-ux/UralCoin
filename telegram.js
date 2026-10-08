// UralCoin Telegram CONNECT v4


const tg = window.Telegram.WebApp;




tg.ready();

tg.expand();




tg.setHeaderColor("#090414");

tg.setBackgroundColor("#090414");






const telegramUser =
tg.initDataUnsafe?.user;







function loadTelegramUser(){



if(!telegramUser){



let player =
Storage.getPlayer();





if(!player.id){


player.id =
"guest";



Storage.savePlayer(player);


}





return;


}








let player =
Storage.getPlayer();






player.id =
String(
telegramUser.id
);





player.name =

telegramUser.first_name ||

"Игрок";





player.username =

telegramUser.username ||

"";





player.photo =

telegramUser.photo_url ||

"";







Storage.savePlayer(
player
);






localStorage.setItem(

"telegram_id",

String(
telegramUser.id
)

);






updateProfile();



}









function updateProfile(){



const avatar =
document.getElementById(
"userAvatar"
);




const letter =
document.getElementById(
"avatarLetter"
);






if(!telegramUser)
return;








if(
telegramUser.photo_url &&
avatar
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






const brand =
document.querySelector(
".brand"
);





if(brand){



brand.innerText =
"URALcoin";



}





}












// запуск подключения


loadTelegramUser();







// синхронизация с сервером после загрузки


setTimeout(()=>{



if(
window.API &&
API.syncUser
){


API.syncUser();



}



},700);
