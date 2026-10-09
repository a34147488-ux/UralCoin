// ===================================
// URALcoin SERVER v14.2 FINAL
// Promo + Top + Sync + Transfer
// Telegram Users
// JSON DATABASE
// ===================================


const express = require("express");
const cors = require("cors");
const fs = require("fs");


const app = express();


app.use(cors());

app.use(express.json());



const PORT = process.env.PORT || 3000;

const DB = "users.json";


let users = [];




// ===============================
// DATABASE
// ===============================


function loadUsers(){


try{


if(fs.existsSync(DB)){


users = JSON.parse(

fs.readFileSync(
DB,
"utf8"
)

);


}


}

catch(error){


console.log(
"LOAD ERROR",
error
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
// PROMO GENERATOR
// ===============================


function createPromoCode(){


let code;


do{


code =

"URAL-" +

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
// CREATE USER
// ===============================


app.post("/user",(req,res)=>{


const data=req.body;





console.log(
"USER CONNECT:",
data
);





if(!data.id){


return res.json({

error:"NO_ID"

});


}







let user = users.find(

u=>

String(u.id)===String(data.id)

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



promoCode:createPromoCode(),



activatedCodes:[],



upgrades:{},



apiKey:"",



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

user.promoCode=createPromoCode();



if(!user.activatedCodes)

user.activatedCodes=[];



}







saveUsers();







res.json(user);



});









// ===============================
// GET USER
// ===============================


app.get("/user/:id",(req,res)=>{


let user = users.find(

u=>

String(u.id)===String(req.params.id)

);





res.json(user || null);



});
// ===============================
// SYNC BALANCE
// ===============================


app.post("/sync",(req,res)=>{


let user = users.find(

u=>

String(u.id)===String(req.body.id)

);





if(user){



if(req.body.balance !== undefined){


user.balance = Number(
req.body.balance
);


}



saveUsers();



}



res.json({

success:true

});


});









// ===============================
// CREATE PROMO
// ===============================


app.post("/create-promo",(req,res)=>{


let user = users.find(

u=>

String(u.id)===String(req.body.id)

);







if(!user){



return res.json({

success:false,

message:"USER_NOT_FOUND"

});


}







if(!user.promoCode){



user.promoCode=createPromoCode();



saveUsers();



}






res.json({

success:true,

code:user.promoCode

});



});









// ===============================
// ACTIVATE PROMO
// +5000 U OWNER
// ===============================


app.post("/activate-promo",(req,res)=>{



let userId =

String(req.body.userId);



let code =

String(req.body.code || "")

.toUpperCase()

.trim();







let user = users.find(

u=>

String(u.id)===userId

);







let owner = users.find(

u=>

String(u.promoCode)

===code

);








if(!user){


return res.json({

success:false,

message:"Пользователь не найден"

});


}







if(!owner){



return res.json({

success:false,

message:"Промокод не существует"

});


}







if(

String(owner.id)===String(user.id)

){



return res.json({

success:false,

message:"Нельзя активировать свой код"

});


}








if(!user.activatedCodes)

user.activatedCodes=[];







if(

user.activatedCodes.includes(code)

){



return res.json({

success:false,

message:"Код уже использован"

});


}








user.activatedCodes.push(code);






owner.balance =

Number(owner.balance || 0)

+

5000;






owner.friends =

Number(owner.friends || 0)

+

1;






owner.earnedFromPromo =

Number(owner.earnedFromPromo || 0)

+

5000;







saveUsers();







res.json({

success:true,

reward:5000

});



});









// ===============================
// TRANSFER
// ===============================
// Перевод U между игроками
// ===============================


app.post("/transfer",(req,res)=>{



let from =

String(req.body.from);



let username =

String(req.body.username || "")

.replace("@","")

.toLowerCase();



let amount =

Number(req.body.amount);







let sender = users.find(

u=>

String(u.id)===from

);








let receiver = users.find(

u=>

String(u.username || "")

.toLowerCase()===username

);








if(!sender){


return res.json({

success:false,

message:"Отправитель не найден"

});


}








if(!receiver){


return res.json({

success:false,

message:"Получатель не найден"

});


}








if(sender.id===receiver.id){


return res.json({

success:false,

message:"Нельзя отправить себе"

});


}








if(!amount || amount<=0){


return res.json({

success:false,

message:"Неверная сумма"

});


}








if(sender.balance < amount){


return res.json({

success:false,

message:"Недостаточно U"

});


}








sender.balance -= amount;


receiver.balance += amount;






saveUsers();







res.json({

success:true,

fromBalance:sender.balance,

toBalance:receiver.balance

});



});









// ===============================
// TOP PLAYERS
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


.slice(0,50)

.map(u=>({

id:u.id,

name:u.name || "Игрок",

username:u.username || "",

photo:u.photo || "",

balance:Number(u.balance || 0),

friends:Number(u.friends || 0)

}));






res.json({

players:players

});



});
// ===============================
// DEBUG USERS
// ===============================


app.get("/debug-users",(req,res)=>{


res.json({


count:users.length,


users:users.map(u=>({


id:u.id,

name:u.name,

username:u.username,

balance:u.balance,

promoCode:u.promoCode,

friends:u.friends


}))



});


});









// ===============================
// SERVER STATUS
// ===============================


app.get("/",(req,res)=>{


res.send(

"URALcoin server v14.2 FINAL online"

);


});









// ===============================
// ERROR PROTECTION
// ===============================


app.use((err,req,res,next)=>{


console.log(

"SERVER ERROR:",

err

);



res.status(500).json({

error:"SERVER_ERROR"

});


});









// ===============================
// START SERVER
// ===============================


app.listen(PORT,()=>{


console.log(

"URALcoin v14.2 FINAL started:",

PORT

);



});
