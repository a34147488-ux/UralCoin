// ===================================
// URALcoin TELEGRAM CONNECT v3
// Profile + Server Sync
// ===================================



const tg = window.Telegram.WebApp;



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









async function connectUser(player){



try{



await fetch(

CONFIG.API_URL + "/user",

{


method:"POST",


headers:{


"Content-Type":

"application/json"


},



body:JSON.stringify({


id:player.id,


name:player.name,


photo:player.photo,


username:player.username


})


}



);



console.log(
"USER CONNECTED"
);



}

catch(error){


console.log(
"SERVER ERROR",
error
);



}



}









function updateHeaderProfile(player){



const avatar =

document.getElementById(
"userAvatar"
);



const letter =

document.getElementById(
"avatarLetter"
);






if(!avatar)

return;








if(player.photo){



avatar.src = player.photo;


avatar.style.display =
"block";



if(letter)

letter.style.display =
"none";



}

else{



avatar.style.display =
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



let player = Storage.getPlayer();





player.id =

String(
tgUser.id
);





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






Storage.updateTelegram({


id:tgUser.id,


name:player.name,


username:player.username,


photo:player.photo



});







updateHeaderProfile(player);






connectUser(player);






}

else{



let player = Storage.getPlayer();



updateHeaderProfile(player);



}






window.TelegramPlayer = {


user:tgUser



};
