// ===================================
// URALcoin Telegram Connect v12
// Profile + Avatar + Server Sync
// ===================================



const tg = window.Telegram.WebApp;



tg.ready();

tg.expand();





tg.setHeaderColor("#090414");

tg.setBackgroundColor("#090414");







const user =

tg.initDataUnsafe?.user;









async function connectPlayerToServer(player){



try{



await fetch(

CONFIG.API_URL + "/user",

{


method:"POST",


headers:{


"Content-Type":

"application/json"


},


body:JSON.stringify(player)



}

);





console.log(
"Telegram player synced"
);



}

catch(error){


console.log(
"SERVER ERROR",
error
);



}



}









function updateAvatar(){



const avatar =

document.getElementById(
"userAvatar"
);





const letter =

document.getElementById(
"avatarLetter"
);







let player =

Storage.getPlayer();







if(

player.photo

){



if(avatar){


avatar.src = player.photo;


avatar.style.display="block";


}





if(letter){


letter.style.display="none";


}





}

else{



if(letter){


letter.innerText =


(

player.name ||

"U"

)

.charAt(0)

.toUpperCase();



}





}





}












if(user){



let player =

Storage.getPlayer();








player.id =

String(user.id);





player.name =

user.first_name ||

"Игрок";






player.username =

user.username ||

"";







player.photo =

user.photo_url ||

"";







Storage.savePlayer(
player
);







Storage.updateTelegramProfile({

id:user.id,


username:user.username,


first_name:user.first_name,


photo_url:user.photo_url


});







updateAvatar();







connectPlayerToServer({

id:String(user.id),

name:player.name,

photo:player.photo

});






}

else{





updateAvatar();





}
