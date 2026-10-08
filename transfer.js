const transferButton =
document.getElementById(
"transferButton"
);








if(transferButton){



transferButton.onclick = ()=>{



const username =

document.getElementById(
"transferName"
)
.value
.trim();





const amount =

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







if(!amount || amount <= 0){


alert(
"Введите количество U"
);



return;


}








let player =
Storage.getPlayer();








if(player.balance < amount){



alert(

"Недостаточно средств"

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
.toLocaleString()



});









// обновление баланса на экране



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









alert(

"Переведено "

+
amount
+
" U пользователю "

+
username


);







document.getElementById(
"transferName"
)
.value="";



document.getElementById(
"transferSum"
)
.value="";






};




}
