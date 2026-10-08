// ===================================
// URALcoin PROMO SYSTEM v13.1
// Personal Code Activation
// ===================================



const promoButton =

document.getElementById(
"promoButton"
);








async function activatePromo(){



const input =

document.getElementById(
"promoInput"
);






if(!input)

return;






const code =

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



const response = await fetch(

CONFIG.API_URL +

"/promo/activate",

{


method:"POST",


headers:{


"Content-Type":

"application/json"


},


body:JSON.stringify({



userId:player.id,



code:code



})


}

);







const data = await response.json();









if(!data.success){



if(data.error==="SELF"){



alert(

"Нельзя активировать свой код"

);



}



else if(data.error==="USED"){



alert(

"Этот код уже использован"

);



}



else if(data.error==="NOT_FOUND"){



alert(

"Такого кода нет"

);



}



else{



alert(

"Ошибка активации"

);



}



return;



}









// добавляем награду локально


player.activatedCodes.push(

code

);







player.balance +=

Number(

data.reward || 5000

);








Storage.savePlayer(player);








Storage.addHistory({



type:"Промокод",



amount:data.reward || 5000,



date:new Date()

.toLocaleString("ru-RU")



});









if(typeof updateScreen==="function"){



updateScreen();



}







input.value="";








alert(

"Код активирован\n+"

+

(data.reward || 5000)

+

" U"

);



}

catch(error){



console.log(

"PROMO ERROR",

error

);






alert(

"Сервер недоступен"

);



}




}








if(promoButton){



promoButton.onclick =

activatePromo;



}









window.activatePromo =

activatePromo;
