// ===================================
// URALcoin REFERRAL SYSTEM v12
// Telegram Invite + Bonus
// ===================================



function getReferralLink(){


let player = Storage.getPlayer();



if(!player.id)

return "";






return (

"https://t.me/" +

BOT_USERNAME +

"?start=" +

player.id

);



}









function updateReferral(){



const input =

document.getElementById(
"refLink"
);





const count =

document.getElementById(
"friendsCount"
);






let player =

Storage.getPlayer();






if(input){



input.value =

getReferralLink();



}







if(count){



count.innerText =

player.invited ||

player.friends ||

0;



}



}









async function sendReferral(referrerId){



let player =

Storage.getPlayer();







try{



await fetch(

CONFIG.API_URL + "/referral",

{


method:"POST",


headers:{


"Content-Type":

"application/json"


},


body:JSON.stringify({



userId:player.id,


referrerId:String(referrerId),


name:player.name,


photo:player.photo



})



}

);





}



catch(error){



console.log(

"REFERRAL ERROR",

error

);



}



}









function checkTelegramStart(){



const params =

new URLSearchParams(

window.location.search

);






const start =

params.get("tgWebAppStartParam")

||

params.get("start");






if(!start)

return;








let player =

Storage.getPlayer();







if(

String(start)===String(player.id)

)

return;








if(

player.referrer

)

return;








player.referrer =

String(start);








Storage.savePlayer(
player
);







sendReferral(start);






}












// ===============================
// COPY BUTTON
// ===============================


const copyReferral =

document.getElementById(
"copyReferral"
);







if(copyReferral){



copyReferral.onclick=

()=>{



const link =

getReferralLink();






navigator.clipboard.writeText(
link
);





alert(

"Ссылка скопирована"

);



};



}









document.addEventListener(

"DOMContentLoaded",

()=>{



updateReferral();



checkTelegramStart();



});
