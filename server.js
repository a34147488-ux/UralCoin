// ===================================
// URALcoin SERVER v15.2
// Balance Sync FIX
// Top FIX
// Transfer FIX
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



let users=[];






// ===============================
// DATABASE
// ===============================


function loadUsers(){


try{


if(fs.existsSync(DB)){


users =
JSON.parse(

fs.readFileSync(
DB,
"utf8"
)

);


}


}

catch(e){


console.log(
"LOAD ERROR"
);


users=[];


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
// CREATE PROMO
// ===============================


function createPromo(){


let code;


do{


code=

"URAL-"+

Math.random()

.toString(36)

.substring(2,8)

.toUpperCase();



}

while(

users.some(
u=>u.promoCode===code
)

);



return code;


}









// ===============================
// USER REGISTER
// ===============================


app.post("/user",(req,res)=>{



let data=req.body;



if(!data.id)

return res.json({

error:"NO_ID"

});






let user =

users.find(

u=>

String(u.id)

===

String(data.id)

);







if(!user){



user={


id:String(data.id),


name:data.name || "Игрок",


username:data.username || "",


photo:data.photo || "",


balance:0,


clickPower:0.01,


autoPower:0,


friends:0,


earnedFromPromo:0,


promoCode:createPromo(),


activatedCodes:[],


upgrades:{},


created:Date.now()


};



users.push(user);



}

else{



user.name =

data.name ||

user.name;




user.username =

data.username ||

user.username;



user.photo =

data.photo ||

user.photo;



if(!user.promoCode)

user.promoCode=createPromo();



}



saveUsers();




res.json(user);



});









// ===============================
// GET USER
// ===============================


app.get("/user/:id",(req,res)=>{


let user =

users.find(

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
// BALANCE SYNC
// ===============================


app.post("/sync",(req,res)=>{


let user =

users.find(

u=>

String(u.id)

===

String(req.body.id)

);





if(!user){


return res.json({

success:false,

message:"USER NOT FOUND"

});


}






user.balance =

Number(

req.body.balance || 0

);





saveUsers();






res.json({

success:true,

balance:user.balance

});



});









// ===============================
// SEARCH USERS
// ===============================


app.get("/search-users",(req,res)=>{


let q =

String(
req.query.q || ""
)

.toLowerCase()

.trim();





let result =

users

.filter(u=>{


let name =

String(
u.name || ""
)

.toLowerCase();



let username =

String(
u.username || ""
)

.toLowerCase();





return(

name.includes(q)

||

username.includes(
q.replace("@","")
)

);



})



.slice(0,10)

.map(u=>({


id:u.id,

name:u.name,

username:u.username,

photo:u.photo,

balance:u.balance || 0


}));







res.json({

users:result

});



});









// ===============================
// TRANSFER
// ===============================


app.post("/transfer",(req,res)=>{


let from =

String(req.body.from);



let to =

String(req.body.to);



let amount =

Number(req.body.amount);







let sender =

users.find(

u=>

String(u.id)

===

from

);






let receiver =

users.find(

u=>

String(u.id)

===

to

);






if(!sender)

return res.json({

success:false,

message:"Отправитель не найден"

});






if(!receiver)

return res.json({

success:false,

message:"Получатель не найден"

});






if(sender.balance < amount)

return res.json({

success:false,

message:"Недостаточно средств"

});







sender.balance -= amount;


receiver.balance += amount;



saveUsers();





res.json({

success:true,

fromBalance:sender.balance,

receiverBalance:receiver.balance

});



});









// ===============================
// TOP
// ===============================


app.get("/top",(req,res)=>{


let players =

[...users]

.sort(

(a,b)=>

Number(b.balance || 0)

-

Number(a.balance || 0)

)



.slice(0,50);







res.json({

players:players

});



});









// ===============================
// DEBUG
// ===============================


app.get("/debug-users",(req,res)=>{


res.json({

count:users.length,

users:users

});


});









app.get("/",(req,res)=>{


res.send(

"URALcoin v15.2 ONLINE"

);


});









app.listen(PORT,()=>{


console.log(

"URALcoin SERVER STARTED",

PORT

);


});
