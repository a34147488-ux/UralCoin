// ===================================
// URALcoin TELEGRAM v10
// Telegram Profile Connect
// ===================================



const tg =
window.Telegram.WebApp;



tg.ready();

tg.expand();





tg.setHeaderColor(
"#090414"
);



tg.setBackgroundColor(
"#090414"
);







const tgUser =
tg.initDataUnsafe?.user;









async function sendUserToServer(player){


try{



await fetch(

CONFIG.API_URL +
"/user",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

id:player.id,


name:player.name,


photo:player.photo


})


}

);






console.log(
"User synced"
);



}

catch(error){



console.log(
"Server error",
error
);



}



}









function updateAvatar(player){



const img =
document.getElementById(
"userAvatar"
);



const letter =
document.getElementById(
"avatarLetter"
);






if(!img)

return;







if(player.photo){



img.src =
player.photo;



img.style.display =
"block";



if(letter)

letter.style.display =
"none";



}

else{



img.style.display =
"none";



if(letter){



letter.style.display =
"block";



letter.innerText =

(player.name || "U")
.charAt(0)
.toUpperCase();



}



}



}









if(tgUser){





localStorage.setItem(

"telegram_id",

tgUser.id

);









let player =
Storage.getPlayer();







player.id =
String(tgUser.id);





player.name =

tgUser.first_name ||

"Игрок";





player.username =

tgUser.username ||

"";






player.photo =

tgUser.photo_url ||

"";







Storage.savePlayer(
player
);






Storage.updateTelegram({

id:tgUser.id,


username:tgUser.username,


name:tgUser.first_name,


photo:tgUser.photo_url



});






updateAvatar(
Storage.getPlayer()
);






sendUserToServer(
Storage.getPlayer()
);







}

else{



let player =
Storage.getPlayer();



updateAvatar(player);



}
