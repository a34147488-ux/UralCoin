// ===================================
// URALcoin TRANSFER v14.2 FINAL
// Server Transfers
// ===================================


const transferButton =

document.getElementById(
"transferButton"
);





if(transferButton){



transferButton.onclick = async ()=>{



const nameInput =

document.getElementById(
"transferName"
);




const sumInput =

document.getElementById(
"transferSum"
);





const username =

nameInput.value
.trim();





const amount =

Number(
sumInput.value
);






if(!username){


alert(
"Введите пользователя"
);


return;


}







if(!amount || amount<=0){


alert(
"Введите количество U"
);


return;


}







let player =

Storage.getPlayer();







if(player.balance < amount){


alert(
"Недостаточно U"
);


return;


}









try{



let response = await fetch(

CONFIG.API_URL + "/transfer",

{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({

from:String(player.id),

username:username,

amount:amount


})


}

);






let data = await response.json();







if(data.success){



player.balance =

Number(data.fromBalance);





Storage.savePlayer(player);







if(typeof updateScreen==="function"){


updateScreen();


}






alert(

"Успешно отправлено "

+

amount.toFixed(3)

+

" U"

);







nameInput.value="";

sumInput.value="";



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
"TRANSFER ERROR",
error
);



alert(
"Ошибка сервера"
);


}




};



}
