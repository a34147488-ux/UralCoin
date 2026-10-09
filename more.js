// ===================================
// URALcoin MORE v17
// History + API Key System
// ===================================



function openPage(page){


document
.querySelectorAll(".page")
.forEach(item=>{


item.classList.remove(
"active"
);


});




let target =
document.getElementById(page);



if(target){


target.classList.add(
"active"
);


}



}





// ===============================
// HISTORY BUTTON
// ===============================


const historyBtn =
document.getElementById(
"historyBtn"
);



if(historyBtn){


historyBtn.onclick = ()=>{


showHistory();


};


}









function showHistory(){



let player =
Storage.getPlayer();





let history =
player.history || [];






if(history.length===0){


alert(
"История переводов пустая"
);


return;


}






let text = "История:\n\n";






history
.slice()
.reverse()
.forEach(item=>{



text +=

(item.type || "Операция")
+

"\n"

+

(item.amount || 0)

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



const apiBtn =
document.getElementById(
"apiBtn"
);






if(apiBtn){


apiBtn.onclick = ()=>{


showApiKey();


};


}








function showApiKey(){



let player =
Storage.getPlayer();





if(!player.apiKey){



player.apiKey =

"URAL-"

+

Math.random()

.toString(36)

.substring(2,10)

.toUpperCase();






Storage.savePlayer(player);



}






alert(

"Ваш API ключ:\n\n"

+

player.apiKey

);



}
