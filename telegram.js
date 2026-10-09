// ===================================
// URALcoin TELEGRAM v17
// User Sync + Avatar
// ===================================


function initTelegram(){



let player =
Storage.getPlayer();





let tg =
window.Telegram &&
window.Telegram.WebApp;






if(tg){


tg.ready();

tg.expand();



}








if(
tg &&
tg.initDataUnsafe &&
tg.initDataUnsafe.user
){



let user =
tg.initDataUnsafe.user;





player.id =
String(user.id);





player.name =

(
user.first_name || ""

)

+

(
user.last_name
?
" "+user.last_name
:
""
);






player.username =
user.username || "";






player.photo =
user.photo_url || "";






}








Storage.savePlayer(player);







// синхронизация с сервером


if(
window.API &&
API.syncUser
){


API.syncUser();


}





console.log(
"Telegram USER",
player
);



}







document.addEventListener(

"DOMContentLoaded",

()=>{


initTelegram();


});





window.initTelegram =
initTelegram;
