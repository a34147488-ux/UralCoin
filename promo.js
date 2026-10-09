// =====================================
// URALcoin PROMO + REFERRAL v1
// =====================================



function updatePromo(){



let player = Storage.getPlayer();





if(!player)

return;







let code =

document.getElementById(

"personalCode"

);





let friends =

document.getElementById(

"promoFriends"

);






let earned =

document.getElementById(

"promoEarned"

);







if(code){


code.value =

player.promo_code || "Создание...";


}






if(friends){



friends.innerText =

player.friends || 0;


}







if(earned){



earned.innerText =

(player.earned_from_promo || 0)

+

" U";


}



}









// =====================================
// COPY CODE
// =====================================


let copyButton =

document.getElementById(

"copyReferral"

);






if(copyButton){



copyButton.onclick=()=>{



let player =

Storage.getPlayer();






if(!player || !player.promo_code)

return;







navigator.clipboard.writeText(

player.promo_code

);






alert(

"Промокод скопирован"

);



};



}









// =====================================
// ACTIVATE PROMO
// =====================================


let activate =

document.getElementById(

"activatePromo"

);







if(activate){



activate.onclick=async()=>{



let player =

Storage.getPlayer();






let input =

document.getElementById(

"promoInput"

);








if(!input.value)

return;








try{



let response =

await fetch(

CONFIG.API_URL + "/promo",

{


method:"POST",


headers:{


"Content-Type":

"application/json"


},


body:JSON.stringify({


id:String(player.id),


code:input.value.trim()


})


}

);








let data =

await response.json();







alert(

data.message

);







if(data.success){



player.balance += 5000;



Storage.savePlayer(

player

);



if(window.updateUI)

window.updateUI();



input.value="";



}





}

catch(e){



alert(

"Ошибка соединения"

);



}



};



}









document.addEventListener(

"DOMContentLoaded",

()=>{


updatePromo();



});








window.updatePromo = updatePromo;
