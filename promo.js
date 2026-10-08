// =================================
// URALcoin PROMO v13.2
// PERSONAL INVITE BONUS
// +5000 U
// =================================



function createPromoCode(){


let chars =
"ABCDEFGHJKLMNPQRSTUVWXYZ23456789";



let result="URAL-";



for(let i=0;i<6;i++){


result += chars[
Math.floor(
Math.random()*chars.length
)
];


}



return result;


}









function checkPromo(){


let player =
Storage.getPlayer();





if(!player.promoCode){



player.promoCode =
createPromoCode();



Storage.savePlayer(player);



}







let code =
document.getElementById("myPromo");





if(code){


code.value =
player.promoCode;


}







let count =
document.getElementById("activatedCount");



if(count){


count.innerText =
player.friends || 0;


}







let earned =
document.getElementById("promoEarn");



if(earned){


earned.innerText =
(player.earnedFromPromo || 0)
+
" U";


}



}









// ===============================
// COPY CODE
// ===============================



let copy =
document.getElementById("copyCode");



if(copy){



copy.onclick=function(){



let player =
Storage.getPlayer();





if(!player.promoCode)

return;





navigator.clipboard.writeText(

player.promoCode

);





alert(
"Ваш код скопирован"
);



};



}









// ===============================
// ACTIVATE CODE
// ===============================



let activate =
document.getElementById("activatePromo");





if(activate){



activate.onclick=function(){



let input =
document.getElementById("promoInput");





let code =

input.value

.trim()

.toUpperCase();






if(!code){


alert(
"Введите код"
);


return;


}







let player =
Storage.getPlayer();








if(code===player.promoCode){


alert(
"Нельзя активировать свой код"
);


return;


}







if(!player.usedPromos)

player.usedPromos=[];








if(player.usedPromos.includes(code)){



alert(
"Этот код уже использован"
);



return;



}








// ищем владельца кода

let owner =

localStorage.getItem(
"promo_"+code
);







if(!owner){



alert(
"Код не найден"
);



return;



}








// сохраняем использование


player.usedPromos.push(code);






Storage.savePlayer(player);








// бонус игроку с кодом


let ownerData =

JSON.parse(owner);






ownerData.balance += 5000;


ownerData.friends =
(ownerData.friends || 0)+1;


ownerData.earnedFromPromo =
(ownerData.earnedFromPromo || 0)+5000;







localStorage.setItem(

"promo_"+code,

JSON.stringify(ownerData)

);








alert(
"Код активирован\nВладелец получил +5000 U"
);







input.value="";



updateScreen();



};



}









// ===============================
// REGISTER CODE
// ===============================



function registerPromo(){



let player =
Storage.getPlayer();






if(!player.promoCode){



player.promoCode =
createPromoCode();



}








localStorage.setItem(

"promo_"+player.promoCode,

JSON.stringify(player)

);







Storage.savePlayer(player);



}








registerPromo();

checkPromo();
