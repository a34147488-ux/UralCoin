const BOT_USERNAME = "uralscoin_bot";



function loadReferrals(){


const box = document.querySelector(".referrals");


if(!box) return;



let userId = "";



if(window.Telegram && Telegram.WebApp){


const tgUser = Telegram.WebApp.initDataUnsafe?.user;


if(tgUser){

userId = tgUser.id;

}


}





if(!userId){


userId = localStorage.getItem("user_id");


}





if(!userId){


userId = "123456";


}





const link = 
`https://t.me/${BOT_USERNAME}?start=${userId}`;






box.innerHTML = `



<div class="card">



<h2>

Рефералы

</h2>




<p>

Приглашено:

<b id="invite-count">

0

</b>

</p>





<p>

Награда за человека:

<b>

5000 U

</b>

</p>





<input 

value="${link}"

readonly

class="ref-link"

>




<button onclick="copyReferral()">

Скопировать ссылку

</button>




</div>



`;





}





function copyReferral(){



const input = document.querySelector(".ref-link");



if(!input) return;



navigator.clipboard.writeText(
input.value
);



alert(
"Ссылка скопирована"
);



}





loadReferrals();
