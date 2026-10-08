// ===================================
// URALcoin SERVER v8
// Users + Balance + Top + Referrals
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


const data=req.body;



if(!data.id){


return res.json({

error:"no id"

});


}






let user = users.find(

u=>String(u.id)===String(data.id)

);







if(!user){



user={


id:String(data.id),


name:data.name || "Игрок",


photo:data.photo || "",


balance:0,


friends:0,


invited:0,


clickPower:0.01,


autoPower:0,


referrer:null,


created:Date.now()



};



users.push(user);



}

else{


if(data.name)

user.name=data.name;



if(data.photo)

user.photo=data.photo;



}



saveUsers();



res.json(user);



});









// ===============================
// GET USER
// ===============================


app.get("/user/:id",(req,res)=>{


const user = users.find(

u=>String(u.id)===String(req.params.id)

);



res.json(user || null);



});









// ===============================
// SYNC BALANCE
// ===============================


app.post("/sync",(req,res)=>{


const id=req.body.id;



const balance=

Number(req.body.balance || 0);





const user = users.find(

u=>String(u.id)===String(id)

);





if(user){



user.balance=balance;


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
// REFERRALS
// ===============================


app.post("/referral",(req,res)=>{



const {

userId,

referrerId,

name

}=req.body;





let user = users.find(

u=>String(u.id)===String(userId)

);






let referrer = users.find(

u=>String(u.id)===String(referrerId)

);






// создаём нового игрока

if(!user){



user={


id:String(userId),


name:name || "Игрок",


photo:"",


balance:0,


friends:0,


invited:0,


clickPower:0.01,


autoPower:0,


referrer:null,


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

Number(referrer.friends||0)+1;





referrer.invited =

Number(referrer.invited||0)+1;






referrer.balance =

Number(referrer.balance||0)+5000;






saveUsers();



}




res.json({

success:true,

user:user

});



});









// ===============================
// STATUS
// ===============================


app.get("/",(req,res)=>{


res.send(

"URALcoin server v8 online"

);


});









app.listen(PORT,()=>{


console.log(

"URALcoin server started on "+PORT

);


});
