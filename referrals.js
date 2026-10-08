const botUsername = "uralscoin_bot";

const reward = 5000;


const tg = window.Telegram.WebApp;


tg.ready();



function getUserId(){


if(tg.initDataUnsafe && tg.initDataUnsafe.user){


return tg.initDataUnsafe.user.id;


}



return null;


}





function getReferralLink(){


const id = getUserId();



if(!id){

return "Откройте приложение внутри Telegram";

}



return `https://t.me/${botUsername}?start=${id}`;


}





function updateReferral(){


let linkBlock =
document.querySelector(".ref-link");



if(linkBlock){


linkBlock.innerHTML = `

Ваша ссылка:

<br><br>

${getReferralLink()}

`;

}



}





const inviteButton =
document.querySelector("#referrals button");



if(inviteButton){


inviteButton.onclick=()=>{


const link =
getReferralLink();



navigator.clipboard.writeText(link);



alert("Ссылка скопирована");


};


}




updateReferral();
