// ===================================
// URALcoin TELEGRAM v17
// Telegram User Connect
// Server Sync Ready
// ===================================


function initTelegram(){



let tg = null;




if(
window.Telegram &&
window.Telegram.WebApp
){


tg = window.Telegram.WebApp;


tg.ready();

tg.expand();


}






let player = Storage.getPlayer();






let user = null;







if(
tg &&
tg.initDataUnsafe &&
tg.initDataUnsafe.user
){



user = tg.initDataUnsafe.user;



}









if(user){



player.id = String(

user.id

);






player.name =

(
user.first_name || ""

)

+

(
user.last_name
?
" " + user.last_name
:
""

);






if(!player.name){

player.name="Игрок";

}






player.username =

user.username || "";






player.photo =

user.photo_url || "";



}






// если Telegram не дал пользователя

// не оставляем гостя

if(
!player.id ||
player.id==="guest"
){


console.log(

"Telegram user not found"

);


return;


}








Storage.savePlayer(player);







localStorage.setItem(

"telegram_id",

String(player.id)

);









// ===============================
// AVATAR
// ===============================



const img =

document.getElementById(

"userAvatar"

);





const letter =

document.getElementById(

"avatarLetter"

);








if(
img &&
player.photo
){



img.src = player.photo;


img.style.display="block";



if(letter)

letter.style.display="none";



}






if(
letter &&
player.name
){



letter.innerText =

player.name

.charAt(0)

.toUpperCase();



}







console.log(

"URALcoin Telegram user",

player

);







// ===============================
// START SERVER SYNC
// ===============================



setTimeout(()=>{



if(
typeof loadPlayer === "function"
){


loadPlayer();


}



},500);





}











// ===============================
// START
// ===============================


document.addEventListener(

"DOMContentLoaded",

()=>{


initTelegram();



});







window.initTelegram = initTelegram;
