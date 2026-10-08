let invited = Number(localStorage.getItem("invited")) || 0;

const referralReward = 5000;



function updateReferrals(){


    let blocks = document.querySelectorAll("#referrals .card p");


    if(blocks.length >= 2){

        blocks[0].innerHTML =
        "Приглашено: <b>" + invited + "</b>";


        blocks[1].innerHTML =
        "За каждого друга: <b>" + referralReward + " U</b>";

    }


}





// создаём ссылку приглашения

function createReferralLink(){


    let userId = "user";


    let link =
    "https://t.me/UralCoinBot?start=" + userId;



    return link;


}





// кнопка приглашения

let inviteButton =
document.querySelector("#referrals button");



if(inviteButton){


inviteButton.addEventListener("click",()=>{


    let link = createReferralLink();


    navigator.clipboard.writeText(link);


    alert("Ваша ссылка скопирована");


});


}





updateReferrals();
