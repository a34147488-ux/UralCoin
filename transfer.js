// ===================================
// URALcoin TRANSFER v14.4
// Search + Real Transfer
// ===================================


let selectedUser = null;



const searchInput =
document.getElementById("transferName");


const resultsBox =
document.getElementById("userSearchResults");





if(searchInput){


searchInput.addEventListener(
"input",
async()=>{


let q =
searchInput.value.trim();



selectedUser=null;



if(q.length < 2){

resultsBox.innerHTML="";

return;

}





try{


let response = await fetch(

CONFIG.API_URL +

"/search-users?q=" +

encodeURIComponent(q)

);



let users = await response.json();



resultsBox.innerHTML="";





users.forEach(user=>{



let div =
document.createElement("div");



div.className="user-result";



div.innerHTML =

`
<b>${user.name}</b>
<br>
<small>
${user.username ? "@"+user.username : "без username"}
</small>
`;





div.onclick=()=>{


selectedUser=user;


searchInput.value =

user.name;



resultsBox.innerHTML="";



};



resultsBox.appendChild(div);



});



}

catch(e){

console.log(e);

}



});


}









const transferButton =
document.getElementById(
"transferButton"
);





if(transferButton){



transferButton.onclick = async()=>{



const sumInput =
document.getElementById(
"transferSum"
);



const amount =
Number(sumInput.value);







if(!selectedUser){


alert(
"Выберите пользователя из списка"
);


return;


}





if(!amount || amount<=0){


alert(
"Введите сумму"
);


return;


}







let player =
Storage.getPlayer();







try{



let response = await fetch(

CONFIG.API_URL+"/transfer",

{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({

from:String(player.id),

receiverId:String(selectedUser.id),

amount:amount


})


}

);







let data =
await response.json();








console.log(
"TRANSFER RESULT",
data
);







if(data.success){



player.balance =
Number(data.fromBalance);



Storage.savePlayer(player);




if(typeof updateScreen==="function")

updateScreen();



alert(
"Перевод выполнен"
);



sumInput.value="";

searchInput.value="";

selectedUser=null;



}

else{


alert(
data.message
||
"Ошибка перевода"
);



}



}

catch(e){


console.log(e);


alert(
"Ошибка соединения"
);


}



};



}
