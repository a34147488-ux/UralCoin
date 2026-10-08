// UralCoin v2
// Переводы игроков



const transferButton =

document.getElementById(
"transferButton"
);








if(transferButton){



transferButton.onclick = ()=>{






const username =

document
.getElementById(
"transferName"
)
.value
.trim();






const amount =

Number(

document
.getElementById(
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







// снимаем баланс



player.balance -= amount;






Storage.savePlayer(
player
);







// сохраняем историю



Storage.addHistory({



type:
"Перевод",



to:
username,



amount:
amount,



date:
new Date()
.toLocaleString(
"ru-RU"
)



});







alert(

"Переведено "
+
amount
+
" U"

);








document
.getElementById(
"transferName"
)
.value="";



document
.getElementById(
"transferSum"
)
.value="";







// обновление баланса


const balance =

document.getElementById(
"balance"
);





if(balance){



balance.innerText =

Number(player.balance)

.toFixed(3)

.replace(".",",");



}





};



}
