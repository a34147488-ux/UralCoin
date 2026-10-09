// =====================================
// URALcoin TELEGRAM CONNECT
// =====================================


let tgUser = null;






function initTelegram(){



if(!window.Telegram || !Telegram.WebApp){


console.log(
"Telegram WebApp not found"
);


return;


}





const tg = Telegram.WebApp;




tg.ready();



tg.expand();







tgUser = tg.initDataUnsafe?.user || null;






if(!tgUser){



console.log(
"User not found"
);



return;



}






console.log(
"Telegram user:",
tgUser
);







createPlayer();




}









async function createPlayer(){



if(!tgUser)

return;







let ref = "";





const params =

new URLSearchParams(

window.location.search

);





if(params.has("tgWebAppStartParam")){


ref =

params.get(

"tgWebAppStartParam"

);


}







try{



let response =

await fetch(

CONFIG.API_URL +

"/player",

{


method:"POST",


headers:{


"Content-Type":

"application/json"


},


body:JSON.stringify({


id:String(tgUser.id),


username:

tgUser.username || "",


first_name:

tgUser.first_name || "",


avatar:

tgUser.photo_url || "",


ref:ref


})


}

);







let player =

await response.json();







localStorage.setItem(

"URAL_player",

JSON.stringify(player)

);







window.currentPlayer = player;







console.log(

"Player loaded",

player

);






if(window.updateUI)

window.updateUI();






}

catch(e){



console.log(

"PLAYER ERROR",

e

);



}



}









function getTelegramUser(){


return tgUser;


}






window.initTelegram =
initTelegram;


window.getTelegramUser =
getTelegramUser;







document.addEventListener(

"DOMContentLoaded",

()=>{


initTelegram();


});
