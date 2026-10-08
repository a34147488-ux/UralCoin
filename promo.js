// ===================================
// URALcoin PROMO SYSTEM v12
// Create + Activate Promo
// ===================================



const promoInput = document.getElementById(
"promoInput"
);



const promoButton = document.getElementById(
"promoButton"
);









async function activatePromo(){



const code =

promoInput?.value.trim();






if(!code){


alert(
"Введите промокод"
);


return;


}







let player =

Storage.getPlayer();








try{



const response = await fetch(

CONFIG.API_URL + "/promo/use",

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







const data = await response.json();







if(!data.success){



if(data.error==="USED"){


alert(
"Вы уже использовали этот промокод"
);


}



else if(data.error==="LIMIT"){


alert(
"Лимит промокода закончился"
);


}


else{


alert(
"Промокод не найден"
);


}



return;


}








player.balance +=

Number(data.reward);








if(!player.usedPromos)

player.usedPromos=[];








player.usedPromos.push(

code.toUpperCase()

);








Storage.savePlayer(
player
);








if(typeof updateScreen==="function"){


updateScreen();


}







alert(

"Получено +"

+

data.reward

+

" U"

);






if(promoInput)

promoInput.value="";





}



catch(error){


console.log(
"PROMO ERROR",
error
);


alert(
"Ошибка сервера"
);


}




}









if(promoButton){



promoButton.onclick=

activatePromo;



}
