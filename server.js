// UralCoin Server v3
// Пользователи + подготовка топов + рефералы


const express = require("express");
const cors = require("cors");


const app = express();


app.use(cors());

app.use(express.json());




// временное хранилище
// позже заменим на PostgreSQL

let users = [];




// ADMIN

const ADMIN_ID = "ТВОЙ_TELEGRAM_ID";





// СОЗДАНИЕ / ПОЛУЧЕНИЕ ИГРОКА


app.post("/user",(req,res)=>{


const data = req.body;



let user = users.find(
u =>
String(u.id) === String(data.id)
);





if(!user){



user = {


id:data.id,


name:
data.name ||
"Игрок",



username:
data.username ||
"",



photo:
data.photo ||
"",



balance:0,



friends:0,



referrer:null,



clickPower:0.01,



autoPower:0



};




users.push(user);



}





res.json(user);



});









// ПОЛУЧИТЬ ИГРОКА


app.get(
"/user/:id",
(req,res)=>{


const user =
users.find(
u =>
String(u.id)
===
String(req.params.id)
);



res.json(
user || null
);



});









// СОХРАНЕНИЕ БАЛАНСА


app.post(
"/balance",
(req,res)=>{


const {
id,
balance
}
=
req.body;




const user =
users.find(
u =>
String(u.id)
===
String(id)
);





if(user){


user.balance =
Number(balance);



}



res.json({

success:true

});



});









// ТОП ИГРОКОВ


app.get(
"/top",
(req,res)=>{


let top =

[...users]

.sort(

(a,b)=>

b.balance -
a.balance

)

.slice(0,20);





res.json(top);



});









// РЕФЕРАЛ


app.post(
"/referral",
(req,res)=>{


const {
userId,
referrerId
}
=
req.body;





const user =
users.find(
u =>
String(u.id)
===
String(userId)
);





const referrer =
users.find(
u =>
String(u.id)
===
String(referrerId)
);





if(
user &&
referrer &&
!user.referrer
){



user.referrer =
referrerId;



referrer.friends +=1;



referrer.balance +=5000;



}





res.json({

success:true

});



});









// АДМИН ВЫДАТЬ МОНЕТЫ


app.post(
"/admin/give",
(req,res)=>{


const {
admin,
id,
amount
}
=
req.body;





if(
String(admin)
!==ADMIN_ID
){


return res.status(403).json({

error:"Нет доступа"

});


}






const user =
users.find(
u =>
String(u.id)
===
String(id)
);





if(user){


user.balance +=
Number(amount);



}




res.json({

success:true

});



});









// АДМИН СНЯТЬ МОНЕТЫ


app.post(
"/admin/take",
(req,res)=>{


const {
admin,
id,
amount
}
=
req.body;





if(
String(admin)
!==ADMIN_ID
){


return res.status(403).json({

error:"Нет доступа"

});


}





const user =
users.find(
u =>
String(u.id)
===
String(id)
);





if(user){


user.balance -=
Number(amount);



}




res.json({

success:true

});



});









app.listen(
3000,
()=>{


console.log(
"UralCoin server v3 started"
);


});
