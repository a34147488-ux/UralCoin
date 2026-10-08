// ===================================
// URALcoin TELEGRAM CONNECT v3
// Telegram User + Server Sync
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








const telegramUser =

tg.initDataUnsafe?.user;









async function sendUserToServer(player){



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


username:player.username || ""


})


}


);





console.log(
"USER SYNC OK"
);



}

catch(error){



console.log(
"USER SYNC ERROR",
error
);



}



}









function connectTelegram(){



if(!telegramUser){



let guest =

Storage.getPlayer();





if(!guest.id){


guest.id="guest";


}





Storage.savePlayer(
guest
);



return;



}








// сохраняем Telegram ID


localStorage.setItem(

"telegram_id",

telegramUser.id

);









let player =

Storage.getPlayer();








player.id =

String(
telegramUser.id
);





player.username =

telegramUser.username || "";





player.name =

telegramUser.first_name || "Игрок";





player.photo =

telegramUser.photo_url || "";









Storage.savePlayer(
player
);








// обновление аватара


const avatar =

document.getElementById(
"userAvatar"
);




const letter =

document.getElementById(
"avatarLetter"
);








if(
player.photo &&
avatar

){



avatar.src =

player.photo;



avatar.style.display =
"block";





if(letter)

letter.style.display =
"none";



}

else{



if(letter){



letter.innerText =

player.name

.charAt(0)

.toUpperCase();



}



}









sendUserToServer(
player
);




}









connectTelegram();
