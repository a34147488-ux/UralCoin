const BOT_USERNAME = "uralscoin_bot";





function getUserId(){


let id =
localStorage.getItem(
"user_id"
);



if(!id){

id = "guest";


}



return id;



}









function createReferralLink(){



return `https://t.me/${BOT_USERNAME}?start=${getUserId()}`;



}









function loadReferral(){



const linkInput =
document.getElementById(
"refLink"
);



const count =
document.getElementById(
"refCount"
);





if(linkInput){


linkInput.value =
createReferralLink();


}





let user =
Storage.getUser();





if(count){


count.innerText =
user.friends || 0;


}



}









// КОПИРОВАНИЕ ССЫЛКИ


const copyButton =
document.getElementById(
"copyRef"
);




if(copyButton){



copyButton.onclick = ()=>{


let link =
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









// проверка входа по рефералу


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
ref !== getUserId()
){



let user =
Storage.getUser();




if(!user.referrer){


user.referrer =
ref;



Storage.saveUser(
user
);



}



}



}









checkReferral();


loadReferral();
