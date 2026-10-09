// ===================================
// URALcoin SERVER v19
// Full API + Roulette FIX
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



// ===================================
// ROULETTE ENGINE v19
// ===================================


let roulette={


active:false,


started:0,


duration:25,


bets:[],


result:null,


history:[]



};





function rouletteTime(){



if(!roulette.active)

return 0;



let passed =

Math.floor(

(Date.now()-roulette.started)

/1000

);



return Math.max(

0,

roulette.duration-passed

);



}







function startRoulette(){



roulette.active=true;


roulette.started=Date.now();


roulette.bets=[];


roulette.result=null;



}







function getColor(number){



if(number===0)

return "green";



let red=[

1,3,5,7,9,

12,14,16,18,

19,21,23,25,

27,30,32,34,36

];



return red.includes(number)

?

"red"

:

"black";



}







function checkWin(type,number){



if(type==="1-18")

return number>=1 && number<=18;



if(type==="13-24")

return number>=13 && number<=24;



if(type==="25-36")

return number>=25 && number<=36;



if(type==="19-36")

return number>=19 && number<=36;



if(type==="even")

return number!==0 && number%2===0;



if(type==="odd")

return number!==0 && number%2!==0;



return false;



}







function finishRoulette(){



let number =

Math.floor(

Math.random()*37

);



roulette.result={


number:number,


color:getColor(number),


time:Date.now()



};





roulette.history.unshift(

roulette.result

);



roulette.history=

roulette.history.slice(0,20);






roulette.bets.forEach(bet=>{



let user=

users.find(

u=>

String(u.id)===String(bet.id)

);





if(!user)

return;







if(checkWin(

bet.type,

number

)){



user.balance +=

bet.amount*2;



if(!user.rouletteHistory)

user.rouletteHistory=[];



user.rouletteHistory.unshift({


number:number,


amount:bet.amount,


win:true,


date:new Date().toLocaleString()



});



}

else{



if(!user.rouletteHistory)

user.rouletteHistory=[];



user.rouletteHistory.unshift({


number:number,


amount:bet.amount,


win:false,


date:new Date().toLocaleString()



});



}



});







roulette.active=false;



saveUsers();



}









setInterval(()=>{



if(

roulette.active &&

rouletteTime()<=0

){



finishRoulette();



}



},1000);
// ===================================
// DATABASE
// ===================================


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
"DB ERROR",
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









// ===================================
// PROMO GENERATOR
// ===================================


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









// ===================================
// API KEY
// ===================================


function generateApiKey(){



return (

"URAL-" +

Math.random()

.toString(36)

.substring(2,12)

.toUpperCase()

);



}









// ===================================
// CREATE USER
// ===================================


app.post(

"/user",

(req,res)=>{



let data=req.body;





if(!data.id){


return res.json({

error:"NO_ID"

});


}







let user=

users.find(

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



user.name=

data.name ||

user.name;



user.username=

data.username ||

user.username;



user.photo=

data.photo ||

user.photo;



if(!user.promoCode)

user.promoCode=

generatePromo();



}







saveUsers();







res.json(user);



});









// ===================================
// GET USER
// ===================================


app.get(

"/user/:id",

(req,res)=>{



let user=

users.find(

u=>

String(u.id)===String(req.params.id)

);





res.json(

user || null

);



});









// ===================================
// SYNC BALANCE
// ===================================


app.post(

"/sync",

(req,res)=>{



let user=

users.find(

u=>

String(u.id)===String(req.body.id)

);







if(user){



user.balance=

Number(

req.body.balance || 0

);



saveUsers();



}





res.json({

success:true

});



});









// ===================================
// TOP
// ===================================


app.get(

"/top",

(req,res)=>{



let top=

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
// ===================================
// API KEY
// ===================================


app.post(

"/api-key",

(req,res)=>{



let user=

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



user.apiKey=

generateApiKey();



saveUsers();



}







res.json({


success:true,


key:user.apiKey



});



});









// ===================================
// SEARCH USERS
// ===================================


app.get(

"/search-users",

(req,res)=>{



let q=

String(

req.query.q || ""

)

.toLowerCase();







let result=

users

.filter(u=>{


return (

(u.name || "")

.toLowerCase()

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









// ===================================
// TRANSFER
// ===================================


app.post(

"/transfer",

(req,res)=>{



let from=

String(req.body.from);



let to=

String(req.body.to);



let amount=

Number(req.body.amount);







let sender=

users.find(

u=>

String(u.id)===from

);







let receiver=

users.find(

u=>

String(u.id)===to

);







if(!sender || !receiver){


return res.json({

success:false,

message:"Пользователь не найден"

});


}







if(amount<=0){


return res.json({

success:false,

message:"Неверная сумма"

});


}







if(sender.balance < amount){


return res.json({

success:false,

message:"Недостаточно средств"

});


}







sender.balance-=amount;


receiver.balance+=amount;








if(!sender.history)

sender.history=[];



if(!receiver.history)

receiver.history=[];








sender.history.unshift({


type:"Отправлено",


to:receiver.name,


amount:amount,


date:new Date().toLocaleString()



});







receiver.history.unshift({


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









// ===================================
// HISTORY
// ===================================


app.get(

"/history/:id",

(req,res)=>{



let user=

users.find(

u=>

String(u.id)===String(req.params.id)

);







if(!user){


return res.json({

history:[]

});


}






res.json({

history:user.history || []

});



});









// ===================================
// ROULETTE STATE
// ===================================


app.get(

"/roulette/state",

(req,res)=>{



if(!roulette.active){



startRoulette();



}







res.json({


active:roulette.active,


timeLeft:rouletteTime(),


bets:roulette.bets.map(b=>({


id:b.id,


type:b.type,


amount:b.amount



})),



betsCount:roulette.bets.length,



result:roulette.result,



history:roulette.history



});



});









// ===================================
// ROULETTE BET
// ===================================


app.post(

"/roulette/bet",

(req,res)=>{



let id=

String(req.body.id);



let amount=

Number(req.body.amount);



let type=

String(req.body.type);







let user=

users.find(

u=>

String(u.id)===id

);








if(!user){


return res.json({

success:false,

message:"Игрок не найден"

});


}







if(!roulette.active){



startRoulette();



}







if(rouletteTime()<=0){


return res.json({

success:false,

message:"Раунд закончился"

});


}







if(amount<=0){


return res.json({

success:false,

message:"Введите сумму"

});


}







if(user.balance < amount){


return res.json({

success:false,

message:"Недостаточно U"

});


}







user.balance-=amount;







roulette.bets.push({


id:id,


name:user.name,


type:type,


amount:amount



});







saveUsers();







res.json({


success:true,


message:"Ставка принята",


timeLeft:rouletteTime()



});



});
// ===================================
// CREATE PROMO
// ===================================


app.post(

"/create-promo",

(req,res)=>{



let user=

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

user.promoCode=

generatePromo();







saveUsers();







res.json({


success:true,


code:user.promoCode



});



});









// ===================================
// ACTIVATE PROMO
// ===================================


app.post(

"/activate-promo",

(req,res)=>{



let user=

users.find(

u=>

String(u.id)===String(req.body.userId)

);







let code=

String(

req.body.code || ""

)

.toUpperCase();







let owner=

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







if(

!user.activatedCodes

)

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



owner.balance+=5000;



owner.friends+=1;



owner.earnedFromPromo+=5000;







saveUsers();







res.json({

success:true

});



});









// ===================================
// ROOT
// ===================================


app.get(

"/",

(req,res)=>{



res.send(

"URALcoin server v19 online"

);



});









// ===================================
// START SERVER
// ===================================


app.listen(

PORT,

()=>{


console.log(

"URALcoin v19 started on",

PORT

);



});
