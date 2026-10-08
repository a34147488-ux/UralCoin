// ===================================
// URALcoin REFERRALS v10
// Telegram Referral System
// ===================================



function createReferralLink(){


let player =
Storage.getPlayer();



if(
!player.id ||
player.id==="guest"
)

return "";





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









function loadReferral(){



let input =
document.getElementById(
"refLink"
);



if(input){

input.value =
createReferralLink();

}




let count =
document.getElementById(
"friendsCount"
);





if(count){


let player =
Storage.getPlayer();



count.innerText =
player.friends || 0;



}




renderWorkers();


}









function renderWorkers(){



let box =
document.getElementById(
"workersList"
);



if(!box)

return;





let workers =
Storage.getPlayer().workers;




if(!workers.length){



box.innerHTML =

`
<div class="top-empty">
Пока нет приглашённых
</div>
`;



return;


}







box.innerHTML="";







workers.forEach(worker=>{



let div =
document.createElement(
"div"
);



div.className =
"worker-card";






let avatar = "";



if(worker.photo){



avatar =

`
<img src="${worker.photo}">
`;



}

else{



avatar =

`
<div class="worker-letter">
${worker.name[0]}
</div>
`;



}






div.innerHTML =

`

${avatar}


<div>


<b>
${worker.name}
</b>


<br>


<span>
Уровень:
${worker.level || 1}
</span>


</div>


`;




box.appendChild(div);



});





}










// ===============================
// CHECK START PARAM
// ===============================


async function checkReferralStart(){



let start = "";






const tg =
window.Telegram?.WebApp;






if(
tg &&
tg.initDataUnsafe &&
tg.initDataUnsafe.start_param
){


start =
tg.initDataUnsafe.start_param;


}








if(!start){



let params =
new URLSearchParams(
window.location.search
);



start =
params.get("start") || "";



}








if(!start)

return;







let player =
Storage.getPlayer();







if(
String(start)
===
String(player.id)
)

return;







let saved =
Storage.setReferrer(start);






if(saved){



try{



await fetch(

CONFIG.API_URL+
"/referral",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

userId:player.id,

referrerId:start,

name:player.name


})


}

);



console.log(
"Referral sent"
);



}

catch(e){



console.log(
"Referral error",
e
);



}



}



}









// ===============================
// COPY BUTTON
// ===============================


let copy =
document.getElementById(
"copyReferral"
);



if(copy){



copy.onclick = ()=>{



let link =
createReferralLink();



navigator.clipboard.writeText(
link
);



copy.innerText =
"Скопировано";



setTimeout(()=>{


copy.innerText =
"Копировать ссылку";


},1500);



};



}









checkReferralStart();

loadReferral();





setInterval(

loadReferral,

5000

);
