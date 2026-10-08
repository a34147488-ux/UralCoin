
// ===================================
// URALcoin PROMO v10
// Create + Activate Promo Codes
// ===================================




const createPromo =
document.getElementById(
"createPromo"
);



if(createPromo){



createPromo.onclick = async ()=>{



let name =
document.getElementById(
"promoName"
)
.value
.trim();





let reward =
Number(
document.getElementById(
"promoReward"
)
.value
);





let limit =
Number(
document.getElementById(
"promoLimit"
)
.value
);







if(!name || !reward || !limit){


alert(
"Заполните все поля"
);


return;


}






try{



let response =

await fetch(

CONFIG.API_URL +
"/promo/create",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

name:name,


reward:reward,


limit:limit


})


}

);







let data =
await response.json();





if(data){


alert(

"Промокод создан: "
+
name

);



}



}

catch(e){


console.log(
e
);


alert(
"Ошибка сервера"
);



}



};




}









// ===============================
// USE PROMO
// ===============================



const usePromo =
document.getElementById(
"usePromo"
);






if(usePromo){



usePromo.onclick = async ()=>{





let code =
document.getElementById(
"promoInput"
)
.value
.trim();





let player =
Storage.getPlayer();






if(!code){


alert(
"Введите промокод"
);


return;


}







try{



let response =

await fetch(

CONFIG.API_URL +
"/promo/use",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

id:player.id,


code:code


})


}

);







let data =
await response.json();








if(data.success){



player.balance +=
Number(
data.reward
);



Storage.savePlayer(
player
);



updateScreen();



alert(

"Получено +"
+
data.reward
+
" U"

);



}

else{



alert(
"Промокод недоступен"
);



}



}

catch(e){



console.log(
e
);



alert(
"Ошибка сервера"
);



}



};



}
