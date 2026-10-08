// UralCoin Telegram CONNECT v3


const tg = window.Telegram.WebApp;


tg.ready();

tg.expand();



tg.setHeaderColor("#090414");

tg.setBackgroundColor("#090414");





const tgUser =
tg.initDataUnsafe?.user;





function connectTelegram(){



if(!tgUser){



let player =
Storage.getPlayer();



if(!player.id){


player.id="guest";


Storage.savePlayer(player);


}



return;


}






let player =
Storage.getPlayer();





player.id =
tgUser.id;



player.name =
tgUser.first_name ||
"Игрок";



player.username =
tgUser.username ||
"";



player.photo =
tgUser.photo_url ||
"";





Storage.savePlayer(player);





localStorage.setItem(
"telegram_id",
tgUser.id
);





updateTelegramProfile();



}









function updateTelegramProfile(){



const avatar =
document.getElementById(
"userAvatar"
);



const letter =
document.getElementById(
"avatarLetter"
);





if(!tgUser)
return;






if(tgUser.photo_url && avatar){



avatar.src =
tgUser.photo_url;



avatar.style.display="block";



if(letter){

letter.style.display="none";

}


}

else if(letter){



letter.innerText =

(
tgUser.first_name ||
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





connectTelegram();
setTimeout(()=>{

API.syncUser();

},500);
