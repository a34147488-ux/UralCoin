// UralCoin v2
// Дополнительные функции





function openMorePage(page){



document
.querySelectorAll(".page")
.forEach(
(item)=>{


item.classList.remove(
"active"
);



});







const target =
document.getElementById(
page
);





if(target){



target.classList.add(
"active"
);



}



}









// ПРОМОКОДЫ



const promoButton =

document.getElementById(
"promoButton"
);





if(promoButton){



promoButton.onclick = ()=>{



openMorePage(
"promo"
);



};



}











// ИСТОРИЯ



const historyButton =

document.getElementById(
"historyButton"
);





if(historyButton){



historyButton.onclick = ()=>{



openMorePage(
"history"
);



showHistory();



};



}








function showHistory(){



const box =

document.getElementById(
"historyList"
);






if(!box)
return;






let history =

Storage.getHistory();








if(
history.length === 0

){



box.innerHTML =

"Пока операций нет";



return;



}








box.innerHTML = "";








history
.slice()
.reverse()
.forEach(
(item)=>{



let div =

document.createElement(
"div"
);





div.className =
"history-item";





div.innerHTML = `



<b>
${item.type}
</b>


<br>


${item.amount} U


<br>


${item.to || ""}


<br>


<small>
${item.date}
</small>



`;






box.appendChild(
div
);



}



);



}









// API



const apiButton =

document.getElementById(
"apiButton"
);






if(apiButton){



apiButton.onclick = ()=>{



openMorePage(
"api"
);



};



}








const createApi =

document.getElementById(
"createApi"
);






if(createApi){



createApi.onclick = ()=>{



let key =

Storage.generateApiKey();






const box =

document.getElementById(
"apiResult"
);







if(box){



box.innerHTML = `



Ваш API ключ:


<br><br>


<b>
${key}
</b>



`;



}






};



}
