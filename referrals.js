// ===================================
// URALcoin REFERRAL v13
// Personal Promo Code
// ===================================





function updateReferral(){



let player =

Storage.getPlayer();







const code =

document.getElementById(

"personalCode"

);






const friends =

document.getElementById(

"promoFriends"

);






const earned =

document.getElementById(

"promoEarned"

);







if(code){



code.value =

player.promoCode ||

"Создание...";



}







if(friends){



friends.innerText =

player.friends || 0;



}







if(earned){



earned.innerText =


(

player.earnedFromPromo ||

0

)

+

" U";



}



}









// ===============================
// COPY CODE
// ===============================



const copyReferral =

document.getElementById(

"copyReferral"

);






if(copyReferral){



copyReferral.onclick=()=>{



let player =

Storage.getPlayer();






if(!player.promoCode)

return;







navigator.clipboard.writeText(

player.promoCode

);






alert(

"Код скопирован"

);



};



}











// обновление


document.addEventListener(

"DOMContentLoaded",

()=>{



updateReferral();



});









// при обновлении экрана


window.updateReferral =

updateReferral;
