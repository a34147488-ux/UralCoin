// ===================================
// URALcoin Telegram Connect v14
// Auto Register Player
// ===================================


const tg = window.Telegram.WebApp;


tg.ready();

tg.expand();



const tgUser = tg.initDataUnsafe?.user;



async function registerUser(){


let player = Storage.getPlayer();



if(tgUser){


player.id = String(tgUser.id);

player.name =
tgUser.first_name || "Игрок";

player.username =
tgUser.username || "";

player.photo =
tgUser.photo_url || "";


Storage.savePlayer(player);


}




if(!player.id || player.id==="guest"){

console.log("NO TELEGRAM ID");

return;

}





try{


let response = await fetch(

CONFIG.API_URL + "/user",

{


method:"POST",

headers:{


"Content-Type":"application/json"

},


body:JSON.stringify({

id:String(player.id),

name:player.name,

photo:player.photo

})


}

);



let data = await response.json();


console.log("SERVER USER:",data);



if(data.promoCode){


player.promoCode=data.promoCode;


}


Storage.savePlayer(player);



updateAvatar();



}

catch(e){

console.log(
"REGISTER ERROR",
e
);


}


}







function updateAvatar(){


let player=Storage.getPlayer();



let img=document.getElementById(
"userAvatar"
);


let letter=document.getElementById(
"avatarLetter"
);



if(player.photo){


img.src=player.photo;

img.style.display="block";


if(letter)
letter.style.display="none";


}

else{


if(letter)

letter.innerText=

(player.name||"U")
.charAt(0)
.toUpperCase();



}


}





registerUser();
