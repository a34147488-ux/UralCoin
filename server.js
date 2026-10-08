// UralCoin Server v4
// Users + Top + Referrals + Admin


const express = require("express");
const cors = require("cors");


const app = express();



app.use(cors());

app.use(express.json());





// ВРЕМЕННОЕ ХРАНЕНИЕ
// после теста заменим на PostgreSQL


let users = [];




// ТВОЙ TELEGRAM ID

const ADMIN_ID = "ТВОЙ_ID";








// СОЗДАНИЕ ИЛИ ПОЛУЧЕНИЕ ИГРОКА


app.post("/user",(req,res)=>{


const data = req.body;




let user = users.find(

u =>

String(u.id) === String(data.id)

);






if(!user){



user = {


id:String(data.id),



name:
data.name || "Игрок",



username:
data.username || "",



photo:
data.photo || "",



balance:0,



friends:0,



referrer:null,



clickPower:0.01,



autoPower:0,



created:Date.now()



};





users.push(user);



}






else{


// обновляем профиль Telegram


user.name =
data.name || user.name;



user.username =
data.username || user.username;



user.photo =
data.photo || user.photo;



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



const top =


[...users]

.sort(

(a,b)=>

b.balance-a.balance

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

!user.referrer &&

user.id !== referrer.id

){



user.referrer =

String(referrerId);





referrer.friends +=1;



referrer.balance +=5000;



}







res.json({

success:true

});



});









// АДМИН ВЫДАТЬ U


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









// АДМИН СНЯТЬ U


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

"UralCoin server v4 started"

);



});
