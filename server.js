// ===================================
// URALcoin SERVER v13
// Personal Promo Referral System
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

catch(e){


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
// CREATE PROMO CODE
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



if(!data.id){


return res.json({

error:"NO ID"

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



promoCode:createPromoCode(),



activatedCodes:[],



earnedFromPromo:0,



upgrades:{},



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



}






saveUsers();






res.json(user);



});









// ===============================
// GET USER
// ===============================


app.get("/user/:id",(req,res)=>{



const user = users.find(

u=>

String(u.id)===String(req.params.id)

);




res.json(user || null);



});









// ===============================
// SYNC
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
// ACTIVATE PERSONAL CODE
// ===============================


app.post("/promo/activate",(req,res)=>{


const {


userId,

code


}=req.body;







let user = users.find(

u=>

String(u.id)===String(userId)

);






let owner = users.find(

u=>

u.promoCode ===

String(code).toUpperCase()

);







if(!user){


return res.json({

error:"USER"

});


}








if(!owner){


return res.json({

error:"NOT_FOUND"

});


}







if(

String(user.id)===String(owner.id)

){


return res.json({

error:"SELF"

});


}







if(

user.activatedCodes

&&

user.activatedCodes.includes(

code.toUpperCase()

)

){


return res.json({

error:"USED"

});


}







if(!user.activatedCodes)

user.activatedCodes=[];








user.activatedCodes.push(

code.toUpperCase()

);








owner.balance += 5000;



owner.friends =

Number(owner.friends || 0)+1;



owner.earnedFromPromo =

Number(owner.earnedFromPromo || 0)+5000;








saveUsers();







res.json({

success:true,

reward:5000

});



});









// ===============================
// TOP
// ===============================


app.get("/top",(req,res)=>{



let top =

[...users]

.sort(

(a,b)=>

Number(b.balance||0)

-

Number(a.balance||0)

)


.slice(0,50);





res.json(top);



});









// ===============================
// SERVER STATUS
// ===============================


app.get("/",(req,res)=>{


res.send(

"URALcoin server v13 online"

);


});







app.listen(PORT,()=>{


console.log(

"URALcoin v13 started "

+

PORT

);



});
