// =====================================
// URALcoin REFERRAL SYSTEM v1
// =====================================



function updateReferral(){



let player = Storage.getPlayer();





if(!player)

return;






let count =

document.getElementById(

"promoFriends"

);





if(count){



count.innerText =

player.friends || 0;


}





}









// =====================================
// CREATE REF LINK
// =====================================


function getReferralLink(){



let player =

Storage.getPlayer();






if(!player)

return "";







let bot =

"ТВОЙ_БОТ";







return (

"https://t.me/"

+

bot

+

"?start="

+

player.id

);



}









// =====================================
// SHARE
// =====================================


function shareReferral(){



let link =

getReferralLink();






if(!link)

return;







let text =

"Приглашай друзей в URALcoin и получай бонусы 🚀";







if(

window.Telegram &&

Telegram.WebApp

){



Telegram.WebApp.openTelegramLink(

"https://t.me/share/url?url="

+

encodeURIComponent(link)

+

"&text="

+

encodeURIComponent(text)

);



}

else{



navigator.clipboard.writeText(

link

);



alert(

"Ссылка скопирована"

);



}



}









// =====================================
// START
// =====================================


document.addEventListener(

"DOMContentLoaded",

()=>{



updateReferral();



});







window.updateReferral = updateReferral;


window.shareReferral = shareReferral;


window.getReferralLink = getReferralLink;
