const sendButton =
document.getElementById(
"sendTransfer"
);






if(sendButton){



sendButton.onclick = ()=>{



const receiver =
document.getElementById(
"transferUser"
)
.value
.trim();




const amount =
Number(
document.getElementById(
"transferAmount"
)
.value
);






if(!receiver){


alert(
"Введите Username получателя"
);


return;


}





if(!amount || amount <= 0){


alert(
"Введите корректное количество U"
);


return;


}








let user =
Storage.getUser();






if(user.balance < amount){


alert(
"Недостаточно U"
);


return;


}








user.balance -= amount;





Storage.saveUser(
user
);






Storage.addHistory({


type:"send",


to:receiver,


amount:amount,


date:new Date()
.toLocaleString()


});








// обновляем главный баланс


let balance =
document.getElementById(
"balance"
);



if(balance){


balance.innerText =
user.balance.toFixed(2);


}







alert(

`Переведено ${amount} U пользователю ${receiver}`

);






document.getElementById(
"transferUser"
).value="";



document.getElementById(
"transferAmount"
).value="";




};



}
