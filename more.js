// ===================================
// URALcoin MORE v19
// History + API KEY
// ===================================



document.addEventListener(
"DOMContentLoaded",
()=>{


initMore();


});







function initMore(){



const historyBtn =

document.getElementById(
"historyBtn"
);





if(historyBtn){


historyBtn.onclick = ()=>{


showHistory();


};


}







const apiBtn =

document.getElementById(
"apiBtn"
);





if(apiBtn){


apiBtn.onclick = ()=>{


getApiKey();


};


}



}









// ===============================
// HISTORY
// ===============================


function showHistory(){



let player =

Storage.getPlayer();





let history =

player.history || [];






if(!history.length){


alert(
"История переводов пустая"
);


return;


}







let text =

"История переводов:\n\n";








history
.slice()
.reverse()
.forEach(item=>{



text +=

(item.type || "Перевод")

+

"\n"

+

"Сумма: "

+

item.amount

+

" U\n"

+

(item.date || "")

+

"\n\n";



});






alert(text);



}









// ===============================
// API KEY
// ===============================


async function getApiKey(){



let player =

Storage.getPlayer();





if(!player.id){


alert(
"Нет Telegram ID"
);


return;


}







try{



let response = await fetch(

CONFIG.API_URL + "/api-key",

{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({


id:String(player.id)


})


}



);






let data =

await response.json();







if(data.success){



alert(

"Ваш API ключ:\n\n"

+

data.key

);



}

else{


alert(

data.message ||

"Ошибка создания ключа"

);


}







}

catch(e){


console.log(
"API KEY ERROR",
e
);


alert(
"Ошибка соединения с сервером"
);


}



}
