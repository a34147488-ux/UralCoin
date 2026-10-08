// ===================================
// URALcoin REFERRALS v5
// Working Referral System
// ===================================



// ===============================
// Создание ссылки
// ===============================


function createReferralLink(){



const player =
Storage.getPlayer();





if(
!player.id ||
player.id==="guest"
){


return "";

}




return (

"https://t.me/"

+

CONFIG.BOT_USERNAME

+

"?start="

+

player.id

);



}











// ===============================
// Отображение ссылки
// ===============================



function loadReferral(){



const input =

document.getElementById(
"refLink"
);





if(input){


input.value =
createReferralLink();


}







const count =

document.getElementById(
"friendsCount"
);






if(count){


const player =
Storage.getPlayer();



count.innerText =

player.friends || 0;



}



}











// ===============================
// Проверка старта
// ===============================


async function checkReferral(){



let refId = "";





// Telegram start_param


const tg =

window.Telegram?.WebApp;






if(
tg?.initDataUnsafe?.start_param
){



refId =

tg.initDataUnsafe.start_param;



}







// запасной вариант


if(!refId){



const params =

new URLSearchParams(

window.location.search

);



refId =

params.get("start")

|| "";



}






if(!refId)

return;








let player =

Storage.getPlayer();






// нельзя самому себе


if(
String(player.id)
===
String(refId)
)

return;









// если уже был приглашён


if(player.referrer)

return;









// сохраняем


const saved =

Storage.setReferrer(
refId
);






if(!saved)

return;









// отправляем серверу


try{



await fetch(

CONFIG.API_URL + "/referral",

{


method:"POST",


headers:{


"Content-Type":

"application/json"


},


body:JSON.stringify({


userId:player.id,


referrerId:refId,


name:player.name,


photo:player.photo


})


}


);



console.log(
"Referral complete"
);



}

catch(e){



console.log(
"Referral error",
e
);



}



}









// ===============================
// Копирование ссылки
// ===============================



const copyReferral =

document.getElementById(

"copyReferral"

);






if(copyReferral){



copyReferral.onclick = ()=>{



const link =

createReferralLink();





if(
navigator.clipboard
){



navigator.clipboard.writeText(
link
);



}





copyReferral.innerText =
"Скопировано";






setTimeout(()=>{



copyReferral.innerText =
"Копировать ссылку";



},1500);



};



}









// ===============================
// Запуск
// ===============================



checkReferral();


loadReferral();







setInterval(()=>{


loadReferral();



},5000);
