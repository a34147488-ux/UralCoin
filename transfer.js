// ===================================
// URALcoin TRANSFER v14.5
// Search + Safe Transfer System
// ===================================


let selectedReceiver = null;



const nameInput =
document.getElementById("transferName");


const sumInput =
document.getElementById("transferSum");


const transferButton =
document.getElementById("transferButton");





// создаём блок поиска

let searchBox =
document.createElement("div");


searchBox.id="transferResults";


if(nameInput){

nameInput.parentNode.insertBefore(
searchBox,
nameInput.nextSibling
);

}





// ===============================
// SEARCH USERS
// ===============================


async function searchUsers(){


let text =
nameInput.value
.trim()
.toLowerCase();



selectedReceiver=null;


searchBox.innerHTML="";



if(!text)

return;



try{


let response =
await fetch(

CONFIG.API_URL+
"/search-users?q="+
encodeURIComponent(text)

);



let data =
await response.json();





if(!data.users ||
data.users.length===0){


searchBox.innerHTML=

"Пользователи не найдены";


return;


}






data.users.forEach(user=>{



let button =
document.createElement("button");



button.className="menu-card";



button.innerHTML=

`
${user.name || "Игрок"}
<br>
${user.username ? "@"+user.username : ""}
<br>
Баланс: ${user.balance} U
`;





button.onclick=()=>{


selectedReceiver=user;


nameInput.value=
user.name;


searchBox.innerHTML=

"Выбран: "+
(user.name || "Игрок");


};





searchBox.appendChild(button);



});



}

catch(e){


console.log(e);


}



}





if(nameInput){


nameInput.addEventListener(
"input",
searchUsers
);


}







// ===============================
// TRANSFER
// ===============================


if(transferButton){


transferButton.onclick=async()=>{



let amount =
Number(sumInput.value);



let player =
Storage.getPlayer();





if(!selectedReceiver){


alert(
"Выберите пользователя из списка"
);


return;


}




if(
String(selectedReceiver.id)
===
String(player.id)
){


alert(
"Нельзя отправить себе"
);


return;


}





if(
!amount ||
amount<=0
){


alert(
"Введите сумму"
);


return;


}





if(
player.balance < amount
){


alert(
"Недостаточно U"
);


return;


}







try{



let response =
await fetch(

CONFIG.API_URL+
"/transfer",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

from:String(player.id),

to:String(selectedReceiver.id),

amount:amount


})

}


);



let data =
await response.json();






if(data.success){



player.balance -= amount;



Storage.savePlayer(player);



if(typeof updateScreen==="function")

updateScreen();



alert(

"Перевод выполнен: "+
amount+
" U"

);



nameInput.value="";

sumInput.value="";

selectedReceiver=null;

searchBox.innerHTML="";



}

else{


alert(

data.message ||
"Ошибка перевода"

);



}



}

catch(e){


alert(
"Ошибка сервера"
);


}



};


}
