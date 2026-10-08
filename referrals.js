const botUsername = "uralscoin_bot";

const reward = 5000;


function getUserId(){

    if(
        window.Telegram &&
        Telegram.WebApp &&
        Telegram.WebApp.initDataUnsafe.user
    ){

        return Telegram.WebApp.initDataUnsafe.user.id;

    }


    return "test123";

}



function getReferralLink(){

    return `https://t.me/${botUsername}?start=${getUserId()}`;

}




function updateReferral(){


    const link =
    document.querySelector(".ref-link");


    if(link){

        link.innerHTML = `
        Ваша ссылка:
        <br><br>
        ${getReferralLink()}
        `;

    }



}



const invite =
document.querySelector("#referrals button");



if(invite){


invite.onclick=function(){


navigator.clipboard.writeText(
getReferralLink()
);


alert(
"Ссылка скопирована"
);


};


}



updateReferral();
