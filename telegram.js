// =====================================
// URALcoin TELEGRAM CONNECT v1
// =====================================


let telegramUser = null;





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





telegramUser = tg.initDataUnsafe.user;






if(!telegramUser){



console.log(

"Telegram user empty"

);



return;



}







console.log(

"USER:",

telegramUser

);






loadPlayer();




}









async function loadPlayer(){



let ref = "";






const startParam =

Telegram.WebApp

.initDataUnsafe

.start_param;






if(startParam){


ref = startParam;


}









try{



let response =

await fetch(

CONFIG.API_URL + "/player",

{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({



id:String(

telegramUser.id

),



username:

telegramUser.username || "",




first_name:

telegramUser.first_name || "",



avatar:

telegramUser.photo_url || "",



ref:ref



})


}

);








let data =

await response.json();









if(data.player){



Storage.savePlayer(

data.player

);






window.player = data.player;





if(window.updateUI)

window.updateUI();





}





}

catch(error){



console.log(

"Telegram player error",

error

);



}



}








function getTelegramUser(){


return telegramUser;


}







window.initTelegram = initTelegram;


window.getTelegramUser = getTelegramUser;








document.addEventListener(

"DOMContentLoaded",

()=>{


initTelegram();


});
