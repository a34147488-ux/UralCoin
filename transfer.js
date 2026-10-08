// ===================================
// URALcoin TRANSFER v12
// Player Transfers
// ===================================





const transferButton =

document.getElementById(

"transferButton"

);







if(transferButton){



transferButton.onclick = async ()=>{






const nameInput =

document.getElementById(

"transferName"

);





const sumInput =

document.getElementById(

"transferSum"

);








const username =

nameInput.value.trim();







const amount =

Number(

sumInput.value

);








if(!username){



alert(

"Введите пользователя"

);



return;



}








if(

!amount ||

amount <= 0

){



alert(

"Введите количество U"

);



return;



}








let player =

Storage.getPlayer();







if(

player.balance < amount

){



alert(

"Недостаточно U"

);



return;



}









// списание



player.balance -= amount;







Storage.savePlayer(

player

);









// история



Storage.addHistory({



type:"Перевод",



to:username,



amount:amount,



date:

new Date()

.toLocaleString(

"ru-RU"

)



});












// обновление экрана


if(

typeof updateScreen === "function"

){



updateScreen();



}











// синхронизация


if(

typeof syncBalance === "function"

){



syncBalance();



}










nameInput.value="";



sumInput.value="";









alert(



"Отправлено "

+

amount.toFixed(3)

+

" U пользователю "

+

username



);







};



}
