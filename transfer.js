// =====================================
// URALcoin TRANSFER v1
// =====================================



function initTransfer(){



let button =

document.getElementById(

"transferButton"

);






if(!button)

return;







button.onclick = async()=>{



let player =

Storage.getPlayer();






if(!player)

return;







let username =

document.getElementById(

"transferName"

).value.trim();







let amount =

Number(

document.getElementById(

"transferSum"

).value

);








if(!username){



alert(

"Введите username"

);



return;


}








if(amount <= 0){



alert(

"Введите сумму"

);



return;


}








if(amount > player.balance){



alert(

"Недостаточно U"

);



return;


}








try{



let response =

await fetch(

CONFIG.API_URL + "/transfer",

{


method:"POST",


headers:{


"Content-Type":

"application/json"


},


body:JSON.stringify({



from:String(player.id),



to:username,



amount:amount



})

}


);








let data =

await response.json();







if(data.success){



player.balance -= amount;






Storage.savePlayer(

player

);






if(window.updateUI)

window.updateUI();






alert(

"Перевод выполнен"

);






document.getElementById(

"transferName"

).value="";



document.getElementById(

"transferSum"

).value="";



}

else{



alert(

data.message || "Ошибка"

);



}



}

catch(e){



alert(

"Нет соединения"

);



}



};



}









document.addEventListener(

"DOMContentLoaded",

()=>{


initTransfer();


});
