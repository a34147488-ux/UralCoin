// ===================================
// URALcoin SERVER v18
// Full API + Roulette System
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
// ROULETTE DATABASE
// ===============================


let roulette = {


active:false,


started:0,


endTime:0,


bets:[],



result:null


};






const rouletteNumbers = [


0,

1,2,3,4,5,6,7,8,9,10,

11,12,13,14,15,16,17,18,

19,20,21,22,23,24,

25,26,27,28,29,30,

31,32,33,34,35,36


];








const redNumbers = [


1,3,5,7,9,

12,14,16,18,

19,21,23,25,27,

30,32,34,36


];







function isRed(number){


return redNumbers.includes(number);


}









// ===============================
// ROULETTE START
// ===============================


function startRoulette(){



roulette.active=true;


roulette.started=Date.now();


roulette.endTime=

Date.now()+25000;


roulette.bets=[];


roulette.result=null;



}








function finishRoulette(){



let result =

Math.floor(

Math.random()*37

);





roulette.result=result;



roulette.active=false;





roulette.bets.forEach(bet=>{



let user = users.find(

u=>

String(u.id)===String(bet.userId)

);





if(!user)

return;






let win=false;





if(bet.type==="1-18"){


win =
result>=1 &&
result<=18;


}







if(bet.type==="19-36"){


win =
result>=19 &&
result<=36;


}







if(bet.type==="13-24"){


win =
result>=13 &&
result<=24;


}







if(bet.type==="25-36"){


win =
result>=25 &&
result<=36;


}







if(bet.type==="even"){


win =
result!==0 &&
result%2===0;


}







if(bet.type==="odd"){


win =
result!==0 &&
result%2!==0;


}






if(win){



user.balance +=

bet.amount*2;



}






});






saveUsers();


}
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
// API KEY
// ===============================


function generateApiKey(){


return (

"URAL-"

+

Math.random()

.toString(36)

.substring(2,12)

.toUpperCase()

);


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


crystals:0,


friends:0,


promoCode:generatePromo(),


activatedCodes:[],


earnedFromPromo:0,


apiKey:"",


upgrades:{},


history:[],


rouletteHistory:[],


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
// API KEY
// ===============================


app.post(
"/api-key",
(req,res)=>{


let user =
users.find(

u=>

String(u.id)===String(req.body.id)

);







if(!user){


return res.json({

success:false,

message:"Пользователь не найден"

});


}







if(!user.apiKey){


user.apiKey = generateApiKey();


saveUsers();


}







res.json({

success:true,

key:user.apiKey

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







if(!sender.history)

sender.history=[];



if(!receiver.history)

receiver.history=[];







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
// ROULETTE STATE
// ===============================


app.get(
"/roulette/state",
(req,res)=>{



if(

!roulette.active &&

Date.now() >

roulette.endTime

){


startRoulette();


}






let timeLeft=0;






if(roulette.active){


timeLeft =

Math.max(

0,

Math.floor(

(roulette.endTime-Date.now())

/1000

)

);



if(timeLeft===0){


finishRoulette();



}


}








res.json({


active:roulette.active,


timeLeft:timeLeft,


result:roulette.result,


bets:roulette.bets.length



});



});









// ===============================
// ROULETTE BET
// ===============================


app.post(
"/roulette/bet",
(req,res)=>{


let user = users.find(

u=>

String(u.id)===String(req.body.id)

);





if(!user){


return res.json({

success:false,

message:"Игрок не найден"

});


}







let amount =
Number(req.body.amount);





let type =
String(req.body.type);






if(amount<=0){


return res.json({

success:false,

message:"Неверная ставка"

});


}







if(user.balance < amount){


return res.json({

success:false,

message:"Недостаточно средств"

});


}







if(!roulette.active){


startRoulette();

}
// продолжаем /roulette/bet


user.balance -= amount;





roulette.bets.push({


userId:String(user.id),


name:user.name,


type:type,


amount:amount


});






saveUsers();






res.json({

success:true,

message:"Ставка принята",

timeLeft:

Math.floor(

(roulette.endTime-Date.now())

/1000

)

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

"URALcoin server v18 Roulette online"

);


});





app.listen(
PORT,
()=>{


console.log(

"URALcoin v18 started",

PORT

);



});
