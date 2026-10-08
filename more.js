
// ===================================
// URALcoin MORE v10
// Navigation + History + API
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
document.getElementById(
page
);



if(target){


target.classList.add(
"active"
);



}



}









// ===============================
// PROMO BUTTON
// ===============================


const promoButton =
document.getElementById(
"promoButton"
);



if(promoButton){


promoButton.onclick = ()=>{


openPage(
"promo"
);


};



}









// ===============================
// HISTORY
// ===============================



const historyButton =
document.getElementById(
"historyButton"
);





if(historyButton){


historyButton.onclick = ()=>{


renderHistory();


openPage(
"history"
);



};



}









function renderHistory(){



let list =
document.getElementById(
"historyList"
);





if(!list)

return;






let history =
Storage.getHistory();







if(
!history ||
history.length===0
){



list.innerHTML =
"Операций нет";



return;


}








list.innerHTML = "";







history
.slice()
.reverse()
.forEach(item=>{



let div =
document.createElement(
"div"
);



div.className =
"history-item";





div.innerHTML =



`

<b>

${item.text || "Операция"}

</b>


<br>


${item.date || ""}

`;






list.appendChild(div);



});



}









// ===============================
// API
// ===============================



const apiButton =
document.getElementById(
"apiButton"
);





if(apiButton){



apiButton.onclick = ()=>{


openPage(
"api"
);



loadApi();



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






let result =
document.getElementById(
"apiResult"
);






if(result){



result.innerText =
key;



}



};



}









function loadApi(){



let result =
document.getElementById(
"apiResult"
);





if(!result)

return;







let key =
Storage.getApiKey();







if(key){


result.innerText =
key;


}

else{


result.innerText =
"Ключ не создан";


}



}









// ===============================
// BOTTOM MENU SYNC
// ===============================



document

.querySelectorAll(".nav")

.forEach(btn=>{



btn.onclick = ()=>{



document

.querySelectorAll(".page")

.forEach(page=>{


page.classList.remove(
"active"
);


});







let target =
document.getElementById(
btn.dataset.page
);





if(target)


target.classList.add(
"active"
);









document

.querySelectorAll(".nav")

.forEach(item=>{


item.classList.remove(
"active"
);


});






btn.classList.add(
"active"
);



};



});
