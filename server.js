// ===================================
// URALcoin SERVER v9
// Users + Sync + Top + Referrals
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




// ===============================
// DATABASE
// ===============================


function loadUsers(){


if(
fs.existsSync(DB)
){


try{


users = JSON.parse(

fs.readFileSync(
DB,
"utf8"
)

);


}

catch(e){


users=[];


}



}



}






function saveUsers(){


fs.writeFileSync(

DB,

JSON.stringify(
users,
null,
2
)

);



}





loadUsers();









// ===============================
// CREATE USER
// ===============================


app.post("/user",(req,res)=>{



const data =
req.body;





if(!data.id){


return res.json({

error:"NO_ID"

});


}






let user = users.find(

u=>

String(u.id)
===
String(data.id)

);






if(!user){



user={


id:String(data.id),


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



clickPower:0.01,


autoPower:0,



friends:0,


invited:0,



referrer:null,



referrals:[],


referralRewarded:[],



created:Date.now()


};






users.push(user);



}

else{


if(data.name)

user.name=data.name;



if(data.username)

user.username=data.username;



if(data.photo)

user.photo=data.photo;



}





saveUsers();



res.json(user);



});









// ===============================
// GET USER
// ===============================


app.get(
"/user/:id",
(req,res)=>{


const user = users.find(

u=>

String(u.id)
===
String(req.params.id)

);



res.json(
user || null
);



});









// ===============================
// SYNC BALANCE
// ===============================


app.post("/sync",(req,res)=>{


const id=req.body.id;


const balance =

Number(
req.body.balance || 0
);





const user = users.find(

u=>

String(u.id)
===
String(id)

);





if(user){


/*
пока оставляем синхронизацию
для текущей версии
*/


user.balance =
balance;



saveUsers();



}





res.json({

success:true

});



});









// ===============================
// TOP
// ===============================


app.get("/top",(req,res)=>{


const top =


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


app.post("/referral",(req,res)=>{


const {


userId,

referrerId,

name,

photo


}=req.body;






if(
!userId ||
!referrerId
){



return res.json({

success:false

});



}






if(
String(userId)
===
String(referrerId)

){



return res.json({

success:false

});


}






let user = users.find(

u=>

String(u.id)
===
String(userId)

);







if(!user){



user={


id:String(userId),


name:
name ||
"Игрок",


photo:
photo ||
"",



balance:0,


clickPower:0.01,


autoPower:0,



friends:0,


invited:0,



referrer:null,


referralRewarded:[],



referrals:[],



created:Date.now()


};





users.push(user);



}






let referrer = users.find(

u=>

String(u.id)
===
String(referrerId)

);







if(
!referrer
){


return res.json({

success:false

});



}








// уже был приглашён


if(
user.referrer

){


return res.json({

success:false

});



}






// запись пригласившего


user.referrer =

String(referrer.id);







// добавляем друга


if(
!referrer.referrals.includes(
String(user.id)
)

){



referrer.referrals.push(

String(user.id)

);





referrer.friends++;


referrer.invited++;





// бонус


referrer.balance += 5000;



}







saveUsers();






res.json({

success:true,


bonus:5000

});



});









// ===============================
// STATUS
// ===============================


app.get("/",(req,res)=>{


res.send(
"URALcoin server v9 online"
);



});








app.listen(PORT,()=>{


console.log(

"URALcoin server v9 started"

);



});
