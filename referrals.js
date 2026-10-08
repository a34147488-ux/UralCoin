const BOT_USERNAME = "uralscoin";

const REF_REWARD = 5000;





function getTelegramID(){


return localStorage.getItem(
"telegram_id"
)
||
"guest";


}









function createReferralLink(){



let id =
getTelegramID();




return (

"https://t.me/"
+
BOT_USERNAME
+
"?start="
+
id

);



}









function loadReferral(){



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
createReferralLink();



}






let player =
Storage.getPlayer();





if(count){


count.innerText =
player.friends
||
0;



}



}









// КОПИРОВАТЬ ССЫЛКУ



const copyBtn =
document.getElementById(
"copyReferral"
);





if(copyBtn){



copyBtn.onclick = ()=>{



const link =
document.getElementById(
"refLink"
);



if(link){



navigator.clipboard.writeText(
link.value
);



alert(
"Ссылка скопирована"
);



}



};



}









// ПРОВЕРКА РЕФЕРАЛА



function checkReferral(){



const params =
new URLSearchParams(
window.location.search
);




const ref =
params.get(
"start"
);





if(
ref &&
ref !== getTelegramID()

){



let player =
Storage.getPlayer();





if(!player.referrer){



player.referrer =
ref;



Storage.savePlayer(
player
);





// награда пригласившему
// будет выполняться через сервер



}



}



}











// открытие страницы промокодов


const promoOpen =
document.getElementById(
"openPromo"
);



if(promoOpen){



promoOpen.onclick = ()=>{



document
.querySelectorAll(".page")
.forEach(
p=>
p.classList.remove("active")
);



document
.getElementById(
"promo"
)
.classList.add(
"active"
);



};




}









checkReferral();

loadReferral();
