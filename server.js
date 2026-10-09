// ===================================
// URALcoin SERVER v16
// Full API System
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
catch(e){


console.log(
"DB LOAD ERROR",
e
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


function generatePromo(){



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


app.post(
"/user",
(req,res)=>{


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


username:data.username || "",


photo:data.photo || "",


balance:0,


clickPower:0.01,


autoPower:0,


friends:0,


promoCode:generatePromo(),


activatedCodes:[],


earnedFromPromo:0,


upgrades:{},


history:[],


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

user.promoCode=generatePromo();



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


let user = users.find(

u=>

String(u.id)===String(req.params.id)

);



res.json(
user || null
);



});









// ===============================
// SYNC BALANCE
// ===============================


app.post(
"/sync",
(req,res)=>{


let user =
users.find(

u=>

String(u.id)===String(req.body.id)

);






if(user){



user.balance =

Number(
req.body.balance || 0
);



saveUsers();



}



res.json({

success:true

});



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

Number(b.balance)-Number(a.balance)

)

.slice(0,50)

.map(u=>({


id:u.id,


name:u.name,


username:u.username,


photo:u.photo,


balance:u.balance,


friends:u.friends



}));





res.json({

players:top

});



});









// ===============================
// SEARCH USERS
// ===============================


app.get(
"/search-users",
(req,res)=>{


let q =

String(
req.query.q || ""
)

.toLowerCase();






let result = users

.filter(u=>{


return (

u.name.toLowerCase()
.includes(q)

||

(u.username || "")
.toLowerCase()
.includes(q)

);

})

.slice(0,10)

.map(u=>({


id:u.id,


name:u.name,


username:u.username,


photo:u.photo,


balance:u.balance



}));







res.json({

users:result

});



});









// ===============================
// TRANSFER
// ===============================


app.post(
"/transfer",
(req,res)=>{


let from =
String(req.body.from);



let to =
String(req.body.to);



let amount =
Number(req.body.amount);







let sender = users.find(

u=>

String(u.id)===from

);



let receiver = users.find(

u=>

String(u.id)===to

);







if(!sender || !receiver){


return res.json({

success:false,

message:"Пользователь не найден"

});


}






if(sender.balance < amount){


return res.json({

success:false,

message:"Недостаточно средств"

});


}





sender.balance -= amount;



receiver.balance += amount;





sender.history.push({

type:"Отправлено",

to:receiver.name,

amount:amount,

date:new Date().toLocaleString()

});





receiver.history.push({

type:"Получено",

from:sender.name,

amount:amount,

date:new Date().toLocaleString()

});






saveUsers();






res.json({

success:true

});



});









// ===============================
// CREATE PROMO
// ===============================


app.post(
"/create-promo",
(req,res)=>{


let user =
users.find(

u=>

String(u.id)===String(req.body.id)

);






if(!user){


return res.json({

success:false

});


}





if(!user.promoCode)

user.promoCode=generatePromo();





saveUsers();





res.json({

success:true,

code:user.promoCode

});



});









// ===============================
// ACTIVATE PROMO
// ===============================


app.post(
"/activate-promo",
(req,res)=>{


let user =
users.find(

u=>

String(u.id)===String(req.body.userId)

);





let code =
String(req.body.code || "")
.toUpperCase();





let owner =
users.find(

u=>

u.promoCode===code

);






if(!user || !owner){


return res.json({

success:false,

message:"Код не найден"

});


}






if(user.id===owner.id){


return res.json({

success:false,

message:"Свой код нельзя"

});


}







if(user.activatedCodes.includes(code)){


return res.json({

success:false,

message:"Уже использован"

});


}







user.activatedCodes.push(code);



owner.balance +=5000;


owner.friends +=1;


owner.earnedFromPromo +=5000;






saveUsers();






res.json({

success:true

});



});









// ===============================
// START
// ===============================


app.get(
"/",
(req,res)=>{


res.send(
"URALcoin server v16 online"
);


});





app.listen(
PORT,
()=>{


console.log(

"URALcoin v16 started",

PORT

);



});
