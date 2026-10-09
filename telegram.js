// ===================================
// URALcoin Telegram Connect v14.5
// Profile + Username Fix
// ===================================


const tg = window.Telegram.WebApp;


tg.ready();

tg.expand();


tg.setHeaderColor("#090414");
tg.setBackgroundColor("#090414");



const tgUser = tg.initDataUnsafe?.user;





async function connectPlayerToServer(player){


try{


await fetch(

CONFIG.API_URL + "/user",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

id:String(player.id),

name:player.name || "Игрок",

username:player.username || "",

photo:player.photo || ""

})

}

);



console.log(
"PLAYER SYNC OK"
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


let player =
Storage.getPlayer();



let avatar =
document.getElementById(
"userAvatar"
);



let letter =
document.getElementById(
"avatarLetter"
);





if(player.photo){


if(avatar){


avatar.src=player.photo;

avatar.style.display="block";


}



if(letter)

letter.style.display="none";



}

else{


if(letter){


letter.innerText =

(player.name || "U")
.charAt(0)
.toUpperCase();



}



}



}








if(tgUser){



let player =
Storage.getPlayer();



player.id =
String(tgUser.id);



player.name =
tgUser.first_name || "Игрок";



player.username =
tgUser.username || "";



player.photo =
tgUser.photo_url || "";




Storage.savePlayer(player);



connectPlayerToServer(player);



updateAvatar();



}

else{


updateAvatar();


}
