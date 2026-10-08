// ===================================
// URALcoin REFERRALS v5
// Real Server Referral System
// ===================================




// ================================
// Создание ссылки
// ================================


function createReferralLink(){


const player =
Storage.getPlayer();



if(
!player.id ||
player.id==="guest"
){

return "";

}



return (

"https://t.me/"

+

CONFIG.BOT_USERNAME

+

"?start="

+

player.id

);



}









// ================================
// Показ ссылки
// ================================


function loadReferral(){



const link =
document.getElementById(
"refLink"
);



if(link){

link.value =
createReferralLink();

}





const count =
document.getElementById(
"friendsCount"
);



if(count){


const player =
Storage.getPlayer();



count.innerText =
player.friends || 0;


}



}









// ================================
// Отправка реферала на сервер
// ================================


async function sendReferral(
referrerId
){


const player =
Storage.getPlayer();





if(

!player.id ||

player.id==="guest"

)

return;







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

userId:
player.id,


referrerId:
referrerId


})

}


);






console.log(
"Referral sent"
);



}

catch(e){


console.log(
"Referral error",
e
);



}



}









// ================================
// Проверка /start
// ================================


function checkStartReferral(){



let start="";






const tg =
window.Telegram?.WebApp;






if(
tg &&
tg.initDataUnsafe &&
tg.initDataUnsafe.start_param
){


start =
tg.initDataUnsafe.start_param;


}






if(!start){



const params =

new URLSearchParams(

window.location.search

);



start =
params.get("start") || "";



}






if(start){



const player =
Storage.getPlayer();






if(

String(player.id)

!==

String(start)

){





if(
!player.referrer
){



Storage.setReferrer(start);



sendReferral(start);



}



}



}



}









// ================================
// Копирование
// ================================


const copyButton =

document.getElementById(
"copyReferral"
);





if(copyButton){



copyButton.onclick=()=>{



const link =
createReferralLink();





navigator.clipboard.writeText(link);




copyButton.innerText =
"Скопировано";





setTimeout(()=>{


copyButton.innerText =
"Копировать ссылку";


},1500);



};



}









// старт


checkStartReferral();

loadReferral();






setInterval(()=>{


loadReferral();



},5000);
