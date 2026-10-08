// UralCoin v2
// Реферальная система



const BOT_USERNAME =
"uralscoin_bot";



const REF_REWARD =
5000;









function getMyId(){



return localStorage.getItem(
"telegram_id"
)
||
"guest";



}









function getReferralLink(){



return (

"https://t.me/"
+
BOT_USERNAME
+
"?start="
+
getMyId()

);



}









function updateReferralScreen(){



const link =
document.getElementById(
"refLink"
);



const count =
document.getElementById(
"friendsCount"
);







if(link){



link.value =
getReferralLink();



}






let player =
Storage.getPlayer();






if(count){



count.innerText =
player.friends || 0;



}



}









// КНОПКА КОПИРОВАНИЯ



const copyReferral =
document.getElementById(
"copyReferral"
);






if(copyReferral){



copyReferral.onclick =
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









// ПРОВЕРКА ВХОДА ПО ССЫЛКЕ



function checkIncomingReferral(){



const params =
new URLSearchParams(
window.location.search
);





const ref =
params.get(
"start"
);







if(
!ref ||
ref === getMyId()

){

return;

}








let player =
Storage.getPlayer();








if(
!player.referrer
){



player.referrer =
ref;



Storage.savePlayer(
player
);





}



}









// запуск



checkIncomingReferral();

updateReferralScreen();
