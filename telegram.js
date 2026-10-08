// ===================================
// URALcoin TELEGRAM v10
// Telegram Profile Connect
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









const telegramUser =

tg.initDataUnsafe?.user;









async function sendUser(player){



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



username:player.username,



photo:player.photo



})

}


);





console.log(
"Telegram user synced"
);



}

catch(error){



console.log(
"USER SYNC ERROR",
error
);



}



}









function loadTelegramProfile(){



let player =

Storage.getPlayer();








if(!telegramUser){



Storage.savePlayer(player);



return;



}









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








Storage.savePlayer(player);











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
player.photo

){



avatar.src =
player.photo;



avatar.style.display =
"block";





if(letter){

letter.style.display =
"none";

}



}

else if(letter){



letter.innerText =

player.name

.charAt(0)

.toUpperCase();



}








sendUser(player);



}









loadTelegramProfile();
