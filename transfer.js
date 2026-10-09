// ===================================
// URALcoin TRANSFER v16
// Search + Player Transfer
// ===================================


let selectedReceiver = null;




let transferName =
document.getElementById(
"transferName"
);


let transferSum =
document.getElementById(
"transferSum"
);


let transferButton =
document.getElementById(
"transferButton"
);





let resultBox =
document.createElement(
"div"
);



resultBox.id =
"transferResults";





if(transferName){



transferName.parentNode.insertBefore(

resultBox,

transferName.nextSibling

);



}









// ===============================
// SEARCH
// ===============================


async function searchUsers(){



let query =

transferName.value

.trim();






selectedReceiver=null;


resultBox.innerHTML="";






if(!query)

return;






try{



let response = await fetch(

CONFIG.API_URL +

"/search-users?q=" +

encodeURIComponent(query)

);





let data = await response.json();







if(
!data.users ||
data.users.length===0
){



resultBox.innerHTML=

"Игроки не найдены";



return;



}







data.users.forEach(user=>{



let item = document.createElement(
"button"
);





item.className="menu-card";





item.innerHTML =

`

${user.name || "Игрок"}

<br>

${user.username ? "@"+user.username : ""}

`;







item.onclick=()=>{



selectedReceiver=user;



transferName.value=

user.name;



resultBox.innerHTML=

"Выбран: "+user.name;



};







resultBox.appendChild(item);



});



}

catch(error){



console.log(

"SEARCH ERROR",

error

);



}



}








if(transferName){



transferName.addEventListener(

"input",

searchUsers

);



}









// ===============================
// SEND
// ===============================



if(transferButton){



transferButton.onclick=async()=>{





let user =
Storage.getPlayer();






let amount =

Number(
transferSum.value
);







if(!selectedReceiver){



alert(

"Выберите получателя"

);



return;



}







if(
amount<=0 ||
isNaN(amount)
){



alert(

"Введите сумму"

);



return;



}








if(
user.balance < amount
){



alert(

"Недостаточно U"

);



return;



}








try{



let response = await fetch(

CONFIG.API_URL+

"/transfer",

{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({


from:String(user.id),


to:String(selectedReceiver.id),


amount:amount


})


}

);







let data =

await response.json();







if(data.success){



user.balance -= amount;






Storage.savePlayer(user);






if(typeof updateScreen==="function"){


updateScreen();


}






if(typeof syncBalance==="function"){


syncBalance();


}






Storage.addHistory({

type:"Перевод",

text:

"Перевод "+

amount+

" U игроку "+

selectedReceiver.name,

date:

new Date().toLocaleString()

});








alert(

"Перевод выполнен"

);






transferName.value="";


transferSum.value="";


resultBox.innerHTML="";


selectedReceiver=null;



}

else{



alert(

data.message ||

"Ошибка перевода"

);



}



}

catch(error){



console.log(

error

);



alert(

"Ошибка сервера"

);



}



};



}
