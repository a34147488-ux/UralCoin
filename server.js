// ===================================
// URALcoin SERVER v10
// Users + Top + Referrals + Promos
// ===================================


const express = require("express");
const cors = require("cors");
const fs = require("fs");



const app = express();


app.use(cors());

app.use(express.json());



const PORT = process.env.PORT || 3000;



const USERS_DB = "users.json";

const PROMO_DB = "promos.json";



let users = [];

let promos = [];




// ===================================
// DATABASE
// ===================================


function loadDatabase(){


try{


if(fs.existsSync(USERS_DB)){


users = JSON.parse(

fs.readFileSync(
USERS_DB,
"utf8"
)

);



}



if(fs.existsSync(PROMO_DB)){


promos = JSON.parse(

fs.readFileSync(
PROMO_DB,
"utf8"
)

);



}



}

catch(e){


users=[];

promos=[];



}



}







function saveUsers(){


fs.writeFileSync(

USERS_DB,

JSON.stringify(
users,
null,
2
)

);



}





function savePromos(){


fs.writeFileSync(

PROMO_DB,

JSON.stringify(
promos,
null,
2
)

);



}




loadDatabase();









// ===================================
// CREATE / UPDATE USER
// ===================================


app.post("/user",(req,res)=>{



const data=req.body;




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


name:data.name || "Игрок",


username:data.username || "",


photo:data.photo || "",



balance:0,


clickPower:0.01,


autoPower:0,



friends:0,


invited:0,


referrer:null,


referralRewarded:[],



usedPromos:[],


history:[],


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









// ===================================
// GET USER
// ===================================


app.get("/user/:id",(req,res)=>{


const user = users.find(

u=>

String(u.id)

===

String(req.params.id)

);



res.json(user || null);



});









// ===================================
// BALANCE SYNC
// ===================================


app.post("/sync",(req,res)=>{


const id=req.body.id;



const user = users.find(

u=>

String(u.id)

===

String(id)

);





if(user){



user.balance = Number(

req.body.balance || 0

);



saveUsers();



}



res.json({

success:true,

user:user || null

});



});









// ===================================
// TOP
// ===================================


app.get("/top",(req,res)=>{



const top =

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









// ===================================
// REFERRAL
// ===================================


app.post("/referral",(req,res)=>{



const {

userId,

referrerId,

name,

photo

}=req.body;






let user = users.find(

u=>

String(u.id)

===

String(userId)

);







let referrer = users.find(

u=>

String(u.id)

===

String(referrerId)

);







if(!user){



user={


id:String(userId),


name:name || "Игрок",


photo:photo || "",


balance:0,


clickPower:0.01,


autoPower:0,


friends:0,


invited:0,


referrer:null,


referralRewarded:[],


usedPromos:[],


history:[],


created:Date.now()



};



users.push(user);



}







if(


referrer &&


!user.referrer &&


String(user.id)!==String(referrer.id)

){



user.referrer =

String(referrer.id);





referrer.friends =

Number(referrer.friends || 0)+1;






referrer.invited =

Number(referrer.invited || 0)+1;






referrer.balance =

Number(referrer.balance || 0)+5000;





referrer.history.push({


type:"Реферал",


amount:5000,


date:new Date().toLocaleString()


});





}



saveUsers();






res.json({

success:true,

user:user

});



});









// ===================================
// CREATE PROMO
// ===================================


app.post("/promo/create",(req,res)=>{


const {

name,

reward,

limit,

owner

}=req.body;





if(!name || !reward){


return res.json({

success:false

});

}



const promo={


name:String(name).toUpperCase(),


reward:Number(reward),


limit:Number(limit || 1),


used:[],


owner:owner || null


};





promos.push(promo);



savePromos();



res.json({

success:true,

promo

});



});









// ===================================
// USE PROMO
// ===================================


app.post("/promo/use",(req,res)=>{


const {

id,

code

}=req.body;





const promo = promos.find(

p=>

p.name === String(code).toUpperCase()

);





if(!promo){


return res.json({

success:false,

message:"Промокод не найден"

});


}






if(

promo.used.includes(String(id))

){


return res.json({

success:false,

message:"Уже использован"

});


}






if(

promo.used.length >= promo.limit

){


return res.json({

success:false,

message:"Лимит закончился"

});


}







const user = users.find(

u=>

String(u.id)

===

String(id)

);





if(user){



user.balance += Number(promo.reward);



promo.used.push(String(id));



user.usedPromos.push(

promo.name

);



saveUsers();

savePromos();



}



res.json({

success:true,

reward:promo.reward

});



});









// ===================================
// STATUS
// ===================================


app.get("/",(req,res)=>{


res.send(
"URALcoin server v10 online"
);


});







app.listen(PORT,()=>{


console.log(

"URALcoin v10 started"

);



});
