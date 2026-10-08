// ===================================
// URALcoin Telegram Connect v13
// Profile + Avatar + Server Sync FIX
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



let response = await fetch(

CONFIG.API_URL + "/user",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(player)

}

);





let serverPlayer = await response.json();







if(serverPlayer){



let local = Storage.getPlayer();





local.id =

String(serverPlayer.id);



local.name =

serverPlayer.name || local.name;



local.photo =

serverPlayer.photo || local.photo;





local.promoCode =

serverPlayer.promoCode || local.promoCode;





local.friends =

serverPlayer.friends || 0;





local.earnedFromPromo =

serverPlayer.earnedFromPromo || 0;






local.balance =

Number(serverPlayer.balance || local.balance);







Storage.savePlayer(local);



}






console.log(
"SERVER SYNC OK"
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





let player = Storage.getPlayer();







if(player.photo){



if(avatar){

avatar.src=player.photo;

avatar.style.display="block";

}



if(letter)

letter.style.display="none";



}

else{



if(letter)

letter.innerText=

(player.name || "U")

.charAt(0)

.toUpperCase();



}



}









if(user){



let player = Storage.getPlayer();




player.id=

String(user.id);



player.name=

user.first_name ||

"Игрок";





player.username=

user.username || "";





player.photo=

user.photo_url || "";





Storage.savePlayer(player);







connectPlayerToServer({


id:String(user.id),


name:player.name,


photo:player.photo


});







updateAvatar();



}

else{


updateAvatar();


}
