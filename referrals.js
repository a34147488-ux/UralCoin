// UralCoin Referrals v3
// Настоящая реферальная система Telegram




const BOT_USERNAME = "ТВОЙ_USERNAME_БОТА";







function createReferralLink(){



const player =

Storage.getPlayer();






if(
!player.id ||
player.id === "guest"
){

return "";

}







return (

"https://t.me/"

+

BOT_USERNAME

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



count.innerText =

Storage.getPlayer()
.friends || 0;



}



}









// получение приглашения через Telegram start


function checkStartReferral(){



const params =

new URLSearchParams(
window.location.search
);





const start =

params.get("tgWebAppStartParam")

||

params.get("start");







if(
start
){



const player =

Storage.getPlayer();







if(
player.id !== String(start)
){



Storage.setReferrer(start);






if(
window.API
){



API.sendReferral(start);



}



}



}



}










// копирование ссылки


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





if(
navigator.clipboard
){



navigator.clipboard.writeText(
link
);



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








// обновление счётчика


setInterval(()=>{


loadReferral();


},5000);
