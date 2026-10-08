// ===================================
// URALcoin SERVER v14
// Promo + Top + Users
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
"DB LOAD ERROR",
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
// CREATE PROMO
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


let data=req.body;





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



crystals:0,



created:Date.now()



};





users.push(user);



}

else{



if(data.name)

user.name=data.name;




if(data.photo)

user.photo=data.photo;






if(!user.promoCode)

user.promoCode=createPromoCode();





if(!user.activatedCodes)

user.activatedCodes=[];



if(!user.upgrades)

user.upgrades={};



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



user.balance =

Number(req.body.balance || 0);



saveUsers();



}





res.json({

success:true

});



});
// ===============================
// CREATE PROMO ROUTE
// ===============================


app.post("/create-promo",(req,res)=>{


let id = req.body.id;





let user = users.find(

u=>

String(u.id)===String(id)

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
// ACTIVATE PROMO v14
// +5000 U OWNER
// ===============================



app.post("/activate-promo",(req,res)=>{


let userId =
req.body.userId;



let code =

String(req.body.code || "")

.toUpperCase()

.trim();






let user = users.find(

u=>

String(u.id)===String(userId)

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

String(user.id)

===

String(owner.id)

){


return res.json({

success:false,

message:"Нельзя использовать свой код"

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
// OLD COMPATIBILITY
// ===============================



app.post("/promo/activate",(req,res)=>{


req.url="/activate-promo";


res.redirect(307,"/activate-promo");


});









// ===============================
// TOP PLAYERS
// ===============================



app.get("/top",(req,res)=>{



let top =

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

photo:u.photo || "",

balance:u.balance || 0


}));







res.json({

players:top

});



});









// ===============================
// SERVER STATUS
// ===============================



app.get("/",(req,res)=>{


res.send(

"URALcoin server v14 online"

);


});









app.listen(PORT,()=>{


console.log(

"URALcoin v14 started on "

+

PORT

);


});
