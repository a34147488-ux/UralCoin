let invited = Number(localStorage.getItem("invited")) || 0;

const reward = 5000;


function createReferralLink(){

    let userId = 
    localStorage.getItem("telegram_id");


    if(!userId){

        userId = "test";

    }


    let botUsername = "ТВОЙ_USERNAME_БОТА";


    return `https://t.me/${botUsername}?start=${userId}`;

}




function updateReferrals(){

    let blocks =
    document.querySelectorAll("#referrals .card p");


    if(blocks.length >= 2){

        blocks[0].innerHTML =
        `Приглашено: <b>${invited}</b>`;


        blocks[1].innerHTML =
        `За каждого друга: <b>${reward} U</b>`;

    }



    let linkBlock =
    document.querySelector(".ref-link");


    if(linkBlock){

        linkBlock.innerHTML =
        createReferralLink();

    }

}



const inviteButton =
document.querySelector("#referrals button");



if(inviteButton){

inviteButton.onclick=()=>{


    navigator.clipboard.writeText(
        createReferralLink()
    );


    alert("Ссылка скопирована");


};

}



updateReferrals();
