// ===================================
// URALcoin REFERRALS v5
// Server Referral System
// ===================================



function createReferralLink(){


const player = Storage.getPlayer();



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








function loadReferral(){



const input =

document.getElementById(
"refLink"
);



if(input){

input.value =
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









// ===============================
// ПРОВЕРКА ВХОДА ПО ССЫЛКЕ
// ===============================


async function checkStartReferral(){



const tg =

window.Telegram?.WebApp;



let start = "";




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






if(!start)

return;







const player =
Storage.getPlayer();







if(

String(player.id)

===

String(start)

)

return;







// сохраняем локально

Storage.setReferrer(start);







// отправляем на сервер


try{



await fetch(

CONFIG.API_URL +

"/referral",

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

start


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









const copyButton =

document.getElementById(

"copyReferral"

);







if(copyButton){



copyButton.addEventListener(

"click",

()=>{



const link =
createReferralLink();





navigator.clipboard.writeText(link);





copyButton.innerText =
"Скопировано";





setTimeout(()=>{


copyButton.innerText =
"Копировать ссылку";


},1500);



}



);



}









checkStartReferral();

loadReferral();







setInterval(()=>{


loadReferral();



},5000);
