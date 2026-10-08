// =================================
// URALcoin PROMO v14
// SERVER PROMO SYSTEM
// +5000 U
// =================================


async function createPromo(){


let player = Storage.getPlayer();



if(player.promoCode){

showPromo(player.promoCode);

return;

}




try{


let response = await fetch(

CONFIG.API_URL + "/create-promo",

{


method:"POST",

headers:{


"Content-Type":"application/json"

},


body:JSON.stringify({

id:player.id

})


}

);



let data = await response.json();





if(data.code){



player.promoCode=data.code;



Storage.savePlayer(player);



showPromo(data.code);



}



}

catch(e){


console.log(
"PROMO CREATE ERROR",
e
);


}



}








function showPromo(code){



let input =

document.getElementById(
"myPromo"
);



if(input){


input.value=code;


}



}









// ================================
// КОПИРОВАНИЕ
// ================================



let copyButton =

document.getElementById(
"copyCode"
);



if(copyButton){



copyButton.onclick=function(){



let player =
Storage.getPlayer();



if(player.promoCode){



navigator.clipboard.writeText(

player.promoCode

);



alert(
"Код скопирован"
);



}



};



}









// ================================
// АКТИВАЦИЯ
// ================================



let activateButton =

document.getElementById(
"activatePromo"
);



if(activateButton){



activateButton.onclick=async function(){



let input =

document.getElementById(
"promoInput"
);





let code =

input.value

.trim()

.toUpperCase();






if(!code){


alert(
"Введите код"
);


return;


}







let player =

Storage.getPlayer();








try{



let response = await fetch(

CONFIG.API_URL+"/activate-promo",

{


method:"POST",

headers:{


"Content-Type":"application/json"

},


body:JSON.stringify({


userId:player.id,


code:code


})

}


);






let data = await response.json();






if(data.success){



alert(

"Код активирован\nВладелец получил +5000 U"

);



input.value="";



}

else{



alert(

data.message ||

"Ошибка активации"

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









// запуск

createPromo();
