const botUsername = "uralscoin_bot";

const reward = 5000;


const userId =
localStorage.getItem("telegram_id");



let invited =
Number(localStorage.getItem("invited")) || 0;





function getReferralLink(){


if(!userId){

return "Откройте приложение через Telegram";

}



return `https://t.me/${botUsername}?start=${userId}`;


}








function updateReferral(){



let blocks =
document.querySelectorAll("#referrals b");



if(blocks.length >= 2){


blocks[0].innerHTML =
invited;



blocks[1].innerHTML =
reward + " U";


}






let link =
document.querySelector(".ref-link");



if(link){


link.innerHTML = `

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


let link =
getReferralLink();



navigator.clipboard.writeText(link);



alert(
"Реферальная ссылка скопирована"
);



};



}






updateReferral();
