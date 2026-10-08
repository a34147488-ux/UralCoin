// ===================================
// URALcoin REFERRALS v4
// Telegram Referral System
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









function checkStartReferral(){



const tg =

window.Telegram?.WebApp;



let start = "";





if(tg?.initDataUnsafe?.start_param){


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



Storage.setReferrer(start);



}



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





if(navigator.clipboard){


navigator.clipboard.writeText(link);


}



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
