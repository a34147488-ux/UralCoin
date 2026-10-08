// =================================
// URALcoin SERVER v5
// Users + Top + Referrals
// =================================


const express = require("express");
const cors = require("cors");
const fs = require("fs");



const app = express();



app.use(cors());

app.use(express.json());





const PORT = 3000;




const ADMIN_ID = "ТВОЙ_ID";






// ===============================
// БАЗА
// ===============================



let users = [];



const DB_FILE = "users.json";





function loadUsers(){



if(

fs.existsSync(DB_FILE)

){



users = JSON.parse(

fs.readFileSync(
DB_FILE,
"utf8"
)

);



}



}




function saveUsers(){



fs.writeFileSync(

DB_FILE,

JSON.stringify(

users,

null,

2

)

);



}




loadUsers();








// ===============================
// СОЗДАНИЕ ИГРОКА
// ===============================



app.post(

"/user",

(req,res)=>{



const data = req.body;






let user = users.find(

u =>

String(u.id)

===

String(data.id)

);







if(!user){



user = {



id:

String(data.id),



name:

data.name || "Игрок",



username:

data.username || "",



photo:

data.photo || "",



balance:

0,



friends:

0,



referrer:

null,



clickPower:

0.010,



autoPower:

0,



history:

[]



};






users.push(user);



}




else{



user.name =

data.name || user.name;



user.username =

data.username || user.username;



user.photo =

data.photo || user.photo;



}





saveUsers();





res.json(user);



});









// ===============================
// ПОЛУЧИТЬ ИГРОКА
// ===============================



app.get(

"/user/:id",

(req,res)=>{



const user = users.find(

u =>

String(u.id)

===

String(req.params.id)

);





res.json(

user || null

);



});









// ===============================
// СОХРАНЕНИЕ БАЛАНСА
// ===============================



app.post(

"/balance",

(req,res)=>{



const {

id,

balance

}

=

req.body;






const user = users.find(

u =>

String(u.id)

===

String(id)

);






if(user){



user.balance =

Number(balance);



saveUsers();



}





res.json({

success:true

});



});









// ===============================
// ТОП ИГРОКОВ
// ===============================



app.get(

"/top",

(req,res)=>{



const top =



[...users]

.sort(

(a,b)=>

b.balance-a.balance

)



.slice(0,20);







res.json(top);



});









// ===============================
// РЕФЕРАЛ
// ===============================



app.post(

"/referral",

(req,res)=>{



const {

userId,

referrerId

}

=

req.body;







const user = users.find(

u =>

String(u.id)

===

String(userId)

);







const referrer = users.find(

u =>

String(u.id)

===

String(referrerId)

);








if(

user &&

referrer &&

!user.referrer &&

user.id !== referrer.id

){





user.referrer =

String(referrerId);





referrer.friends +=1;



referrer.balance +=5000;






saveUsers();



}






res.json({

success:true

});



});









// ===============================
// АДМИН ВЫДАЧА
// ===============================



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

!==

String(ADMIN_ID)

){



return res.status(403)

.json({

error:"Нет доступа"

});



}






const user = users.find(

u =>

String(u.id)

===

String(id)

);






if(user){



user.balance +=

Number(amount);



saveUsers();



}







res.json({

success:true

});



});









// ===============================
// АДМИН СНЯТИЕ
// ===============================



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

!==

String(ADMIN_ID)

){



return res.status(403)

.json({

error:"Нет доступа"

});



}







const user = users.find(

u =>

String(u.id)

===

String(id)

);






if(user){



user.balance -=

Number(amount);



saveUsers();



}





res.json({

success:true

});



});









app.listen(

PORT,

()=>{


console.log(

"URALcoin server v5 started"

);


});
