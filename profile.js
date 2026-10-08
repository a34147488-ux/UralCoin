const name =
localStorage.getItem("telegram_name") || "Игрок";


const avatar =
localStorage.getItem("avatar");



function showProfile(){


const profileBox =
document.querySelector("#more .card");



if(!profileBox) return;



let avatarHTML;



if(avatar){


avatarHTML = `

<img class="profile-avatar"
src="${avatar}">

`;

}else{


avatarHTML = `

<div class="avatar big">
${name[0].toUpperCase()}
</div>

`;

}



let block = document.createElement("div");


block.className="profile-info";


block.innerHTML = `


${avatarHTML}


<h3>
${name}
</h3>


<p>
ID Telegram:
${localStorage.getItem("telegram_id") || "нет"}
</p>


<p>
Баланс:
${Number(localStorage.getItem("balance") || 0).toFixed(2)} U
</p>


<p>
Приглашено:
${localStorage.getItem("invited") || 0}
</p>


`;



profileBox.prepend(block);



}


showProfile();
