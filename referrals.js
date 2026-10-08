const botUsername = "uralscoin_bot";

const reward = 5000;



const tg = window.Telegram.WebApp;

tg.ready();




function getTelegramUser(){


if(
tg.initDataUnsafe &&
tg.initDataUnsafe.user
){

return tg.initDataUnsafe.user;

}


return null;

}





function getReferralLink(){


const user = getTelegramUser();



if(!user){


return "Откройте приложение через Telegram";


}



return `https://t.me/${botUsername}?start=${user.id}`;


}








function saveUser(){


const user = getTelegramUser();


if(!user) return;




let users =
JSON.parse(
localStorage.getItem("users")
) || [];



let exists =
users.find(
u=>u.id===user.id
);




if(!exists){


users.push({

id:user.id,

name:user.first_name || "Игрок",

avatar:user.photo_url || "",

balance:0,

invited:0


});


localStorage.setItem(
"users",
JSON.stringify(users)
);



}


}








function updateReferral(){


saveUser();



let link =
document.querySelector(".ref-link");



if(link){


link.innerHTML = `


Ваша ссылка:


<br><br>


${getReferralLink()}


`;



}




let data =
JSON.parse(
localStorage.getItem("users")
) || [];



let user =
getTelegramUser();



let current =
data.find(
u=>u.id===user?.id
);



let blocks =
document.querySelectorAll("#referrals b");



if(current && blocks.length>=2){


blocks[0].innerHTML =
current.invited;


blocks[1].innerHTML =
reward+" U";


}



}





const btn =
document.querySelector("#referrals button");



if(btn){


btn.onclick=function(){


navigator.clipboard.writeText(
getReferralLink()
);



alert(
"Ссылка скопирована"
);


};



}




updateReferral();
