// ===================================
// URALcoin SERVER v7
// Users + Balance Sync + Top + Referrals
// ===================================


const express = require("express");
const cors = require("cors");
const fs = require("fs");



const app = express();



app.use(cors());

app.use(express.json());



const PORT = 3000;


const DB = "users.json";



let users = [];




// ===================================
// DATABASE
// ===================================


function loadUsers(){


if(fs.existsSync(DB)){


try{


users = JSON.parse(

fs.readFileSync(
DB,
"utf8"
)

);


}

catch(e){


users = [];


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









// ===================================
// CREATE / UPDATE USER
// ===================================



app.post("/user",(req,res)=>{


const data = req.body;



if(!data.id){


return res.json({

error:"no id"

});


}







let user = users.find(

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


referrer:

data.referrer ||

null,


created:

Date.now()



};



users.push(user);



}

else{



if(data.name)

user.name=data.name;



if(data.photo)

user.photo=data.photo;



if(data.referrer)

user.referrer=data.referrer;



}






saveUsers();





res.json(user);



});









// ===================================
// GET USER
// ===================================



app.get("/user/:id",(req,res)=>{



const user = users.find(

u =>

String(u.id)

===

String(req.params.id)

);



res.json(

user || null

);



});









// ===================================
// SYNC BALANCE
// ===================================



app.post("/sync",(req,res)=>{



const id = req.body.id;



const balance = Number(

req.body.balance || 0

);





let user = users.find(

u =>

String(u.id)

===

String(id)

);






if(user){



user.balance = balance;



saveUsers();



}




res.json({

success:true,

user:user || null

});



});









// ===================================
// OLD BALANCE ROUTE
// ===================================



app.post("/balance",(req,res)=>{


const id=req.body.id;


const balance=

Number(req.body.balance);



const user=users.find(

u=>

String(u.id)

===

String(id)

);





if(user){


user.balance=balance;


saveUsers();


}



res.json({

success:true

});


});









// ===================================
// TOP PLAYERS
// ===================================



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









// ===================================
// REFERRAL ADD
// ===================================



app.post("/referral",(req,res)=>{



const {

userId,

referrerId

}=req.body;





const user = users.find(

u =>

String(u.id)

===

String(userId)

);





const referrer = users.find(

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



user.referrer = referrer.id;



referrer.friends += 1;


referrer.invited += 1;


referrer.balance += 5000;



saveUsers();



}




res.json({

success:true

});



});









// ===================================
// SERVER STATUS
// ===================================


app.get("/",(req,res)=>{


res.send(

"URALcoin server v7 online"

);


});









app.listen(PORT,()=>{


console.log(

"URALcoin server v7 started"

);


});
