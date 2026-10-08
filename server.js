// ===================================
// URALcoin SERVER v10
// Users + Balance + Top + Referrals + Promo
// ===================================


const express = require("express");
const cors = require("cors");
const fs = require("fs");



const app = express();



app.use(cors());

app.use(express.json());



const PORT =
process.env.PORT || 3000;



const DB =
"users.json";



let users = [];



let promos = [];





// ===============================
// DATABASE
// ===============================


function loadDB(){


if(fs.existsSync(DB)){


try{


let data =
JSON.parse(
fs.readFileSync(
DB,
"utf8"
)
);



users =
data.users || data;



promos =
data.promos || [];



}

catch(e){


users=[];

promos=[];


}


}



}





function saveDB(){


fs.writeFileSync(

DB,

JSON.stringify(

{

users,

promos

},

null,

2

)

);


}




loadDB();









// ===============================
// CREATE USER
// ===============================



app.post(
"/user",
(req,res)=>{


const data =
req.body;



if(!data.id){


return res.json(
{
error:"no id"
}
);


}







let user =
users.find(

u =>
String(u.id)
===
String(data.id)

);








if(!user){



user = {


id:String(data.id),


name:
data.name ||
"Игрок",


photo:
data.photo ||
"",



balance:0,


friends:0,


invited:0,



clickPower:0.01,


autoPower:0,



referrer:null,



referralRewarded:[],


upgrades:{},



created:
Date.now()



};



users.push(user);



}

else{


if(data.name)

user.name =
data.name;



if(data.photo)

user.photo =
data.photo;



}





saveDB();



res.json(user);



});









// ===============================
// GET USER
// ===============================


app.get(
"/user/:id",
(req,res)=>{


let user =
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









// ===============================
// BALANCE SYNC
// ===============================


app.post(
"/sync",
(req,res)=>{


let user =
users.find(

u =>
String(u.id)
===
String(req.body.id)

);





if(user){



user.balance =
Number(
req.body.balance || 0
);



saveDB();



}




res.json(
{
success:true
}
);



});









// ===============================
// TOP
// ===============================


app.get(
"/top",
(req,res)=>{



let top =

[...users]

.sort(

(a,b)=>

Number(b.balance || 0)

-

Number(a.balance || 0)

)

.slice(0,50);






res.json(top);



});









// ===============================
// REFERRAL
// ===============================



app.post(
"/referral",
(req,res)=>{



const {

userId,

referrerId,

name

}=req.body;







let user =
users.find(

u =>
String(u.id)
===
String(userId)

);







if(!user){



user = {


id:String(userId),


name:name || "Игрок",


photo:"",


balance:0,


friends:0,


invited:0,


referrer:null,


referralRewarded:[]


};



users.push(user);



}








let referrer =
users.find(

u =>
String(u.id)
===
String(referrerId)

);









if(
referrer
&&
!user.referrer
&&
String(user.id)
!==

String(referrer.id)

){



user.referrer =
String(referrer.id);





referrer.balance +=
5000;



referrer.friends =
Number(referrer.friends || 0)+1;



referrer.invited =
Number(referrer.invited || 0)+1;



if(!referrer.referralRewarded)

referrer.referralRewarded=[];



referrer.referralRewarded.push(
String(user.id)
);



}





saveDB();



res.json({

success:true,

user

});



});









// ===============================
// PROMO CREATE
// ===============================



app.post(
"/promo/create",
(req,res)=>{


let promo = {


name:req.body.name,


reward:Number(req.body.reward || 0),


limit:Number(req.body.limit || 1),


used:[]


};





promos.push(promo);



saveDB();



res.json(
promo
);



});









// ===============================
// PROMO USE
// ===============================



app.post(
"/promo/use",
(req,res)=>{


let {

id,

code

}=req.body;





let user =
users.find(

u =>
String(u.id)
===
String(id)

);





let promo =
promos.find(

p =>
p.name === code

);







if(
!user ||
!promo
)

return res.json({

success:false

});







if(
promo.used.includes(
String(id)
)

)

return res.json({

success:false

});







if(
promo.used.length >=
promo.limit
)

return res.json({

success:false

});







user.balance +=
promo.reward;



promo.used.push(
String(id)
);





saveDB();





res.json({

success:true,

reward:promo.reward

});



});









// ===============================
// STATUS
// ===============================


app.get(
"/",
(req,res)=>{


res.send(
"URALcoin server v10 online"
);


});








app.listen(
PORT,
()=>{


console.log(
"URALcoin server v10 started"
);


});
