// ===================================
// URALcoin SERVER v12
// Users + Top + Referrals + Promos
// ===================================


const express = require("express");
const cors = require("cors");
const fs = require("fs");



const app = express();


app.use(cors());

app.use(express.json());



const PORT = process.env.PORT || 3000;



const DB = "users.json";

const PROMO_DB = "promos.json";



let users=[];

let promos=[];







// ===============================
// LOAD DATABASE
// ===============================


function loadDB(){


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





try{


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


promos=[];


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





loadDB();









// ===============================
// CREATE / UPDATE USER
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


username:data.username || "",


balance:0,


friends:0,


invited:0,


clickPower:0.01,


autoPower:0,


referrer:null,


promos:[],


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




if(data.username)

user.username=data.username;



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
// SYNC BALANCE
// ===============================


app.post("/sync",(req,res)=>{


const id=req.body.id;



let user = users.find(

u=>

String(u.id)===String(id)

);







if(user){



user.balance =

Number(req.body.balance || 0);





if(req.body.photo)

user.photo=req.body.photo;





if(req.body.name)

user.name=req.body.name;





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

Number(b.balance||0)

-

Number(a.balance||0)

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








let user = users.find(

u=>

String(u.id)===String(userId)

);







let referrer = users.find(

u=>

String(u.id)===String(referrerId)

);









if(!user){



user={


id:String(userId),


name:name || "Игрок",


photo:photo || "",


balance:0,


friends:0,


invited:0,


clickPower:0.01,


autoPower:0,


referrer:null,


promos:[],


upgrades:{}


};



users.push(user);



}









if(

referrer &&

!user.referrer &&

String(user.id)!==String(referrer.id)

){



user.referrer=

String(referrer.id);





referrer.friends++;


referrer.invited++;





referrer.balance +=5000;





}








saveUsers();







res.json({

success:true

});





});









// ===============================
// CREATE PROMO
// ===============================


app.post("/promo/create",(req,res)=>{



const {


code,

reward,

limit


}=req.body;





if(!code || !reward){


return res.json({

error:"DATA"

});


}







let promo={


code:String(code).toUpperCase(),


reward:Number(reward),


limit:Number(limit||1),


used:[]

};







promos.push(promo);



savePromos();







res.json({

success:true,

promo

});





});









// ===============================
// USE PROMO
// ===============================


app.post("/promo/use",(req,res)=>{



const {


id,

code


}=req.body;







let user = users.find(

u=>

String(u.id)===String(id)

);






let promo = promos.find(

p=>

p.code===String(code).toUpperCase()

);







if(!user || !promo){


return res.json({

error:"NOT FOUND"

});


}







if(

promo.used.includes(

String(id)

)

){


return res.json({

error:"USED"

});


}







if(

promo.used.length >= promo.limit

){


return res.json({

error:"LIMIT"

});


}







user.balance += promo.reward;



promo.used.push(String(id));





if(!user.promos)

user.promos=[];




user.promos.push(promo.code);






saveUsers();

savePromos();







res.json({

success:true,

reward:promo.reward

});



});











// ===============================
// STATUS
// ===============================


app.get("/",(req,res)=>{


res.send(

"URALcoin server v12 online"

);


});









app.listen(PORT,()=>{


console.log(

"URALcoin server started "

+PORT

);


});
