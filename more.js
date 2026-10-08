// ===================================
// URALcoin MORE v2
// API + History + Navigation
// ===================================




// Открытие промокодов


const promoButton =

document.getElementById(
"promoButton"
);



if(promoButton){


promoButton.addEventListener(

"click",

()=>{



openPage("promo");



}


);



}








// История переводов


const historyButton =

document.getElementById(

"historyButton"

);





if(historyButton){


historyButton.addEventListener(

"click",

()=>{



renderHistory();



openPage("history");



}


);



}









// API кнопка


const apiButton =

document.getElementById(

"apiButton"

);





if(apiButton){



apiButton.addEventListener(

"click",

()=>{


openPage("api");



loadApi();



}


);



}









// Получить ключ API


const createApi =

document.getElementById(

"createApi"

);






if(createApi){



createApi.addEventListener(

"click",

()=>{



const key =

Storage.generateApiKey();






const result =

document.getElementById(

"apiResult"

);






if(result){



result.innerText = key;



}



}


);



}










// показать существующий ключ


function loadApi(){



const result =

document.getElementById(

"apiResult"

);






if(!result)

return;







const key =

Storage.getApiKey();






if(key){



result.innerText = key;



}

else{



result.innerText =

"Ключ еще не создан";



}



}











// история


function renderHistory(){



const list =

document.getElementById(

"historyList"

);






if(!list)

return;






const history =

Storage.getHistory();







if(

!history ||

history.length===0

){



list.innerHTML =

"Пока операций нет";



return;



}








list.innerHTML="";







history

.slice()

.reverse()

.forEach(

item=>{



const div =

document.createElement(

"div"

);



div.className=

"history-item";






div.innerHTML =

`

${item.text || "Перевод"}

<br>

${item.date || ""}

`;





list.appendChild(div);



}

);



}









// переключение страниц


function openPage(page){



document

.querySelectorAll(

".page"

)

.forEach(

item=>{



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






document

.querySelectorAll(

".nav"

)

.forEach(

btn=>{



btn.classList.remove(

"active"

);



});



}
