// ===================================
// URALcoin TRANSFER v10
// Player Transfers + History
// ===================================



const transferButton =

document.getElementById(
"transferButton"
);







if(transferButton){



transferButton.onclick = async ()=>{





let username =

document.getElementById(
"transferName"
)
.value
.trim();







let amount =

Number(

document.getElementById(
"transferSum"
)
.value

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
"Введите сумму"
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









// снимаем баланс



player.balance -= amount;






Storage.savePlayer(
player
);









// история



Storage.addHistory({

text:

"Перевод "

+

amount

+

" U пользователю "

+

username,



to:username,



amount:amount,



date:

new Date()

.toLocaleString(
"ru-RU"
)



});









if(typeof updateScreen === "function"){


updateScreen();


}







if(typeof syncBalance === "function"){


syncBalance();


}







document.getElementById(
"transferName"
).value="";



document.getElementById(
"transferSum"
).value="";







alert(

"Переведено "

+

amount

+

" U"

);



};



}
