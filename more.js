function openPage(page){

document
.querySelectorAll(".page")
.forEach(p=>{

p.classList.remove("active");

});


const target =
document.getElementById(page);



if(target){

target.classList.add("active");

}


}









// ПРОМОКОДЫ



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









// ИСТОРИЯ



const historyButton =
document.getElementById(
"historyButton"
);





if(historyButton){



historyButton.onclick = ()=>{


openPage(
"history"
);



loadHistory();


};



}









function loadHistory(){



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







box.innerHTML="";





history
.reverse()
.forEach(item=>{





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





});



}











// API КЛЮЧ



const apiButton =
document.getElementById(
"apiButton"
);





if(apiButton){



apiButton.onclick = ()=>{


openPage(
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





document.getElementById(
"apiResult"
)
.innerHTML =

`

Ваш ключ:

<br><br>

<b>
${key}
</b>

`;





};



}
