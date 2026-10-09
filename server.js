// ===================================
// URALcoin SERVER v20 FINAL
// Full API + Roulette Animation + History
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






// ===================================
// ROULETTE SYSTEM v20
// ===================================



let roulette = {


bets: [],


roundTime:25,


started:Date.now(),


result:null,


history:[]


};









function getRouletteTime(){



let seconds = Math.floor(

(Date.now()-roulette.started)

/1000

);



return roulette.roundTime - seconds;



}









function resetRoulette(){



roulette.bets=[];


roulette.result=null;


roulette.started=Date.now();



}









function getNumberColor(number){



if(number===0)

return "green";



let red=[

1,3,5,7,9,

12,14,16,18,

19,21,23,25,27,

30,32,34,36

];



return red.includes(number)

?

"red"

:

"black";



}









function checkWin(bet,number){



if(
bet.type==="1-18" &&
number>=1 &&
number<=18

)

return true;






if(
bet.type==="13-24" &&
number>=13 &&
number<=24

)

return true;







if(
bet.type==="25-36" &&
number>=25 &&
number<=36

)

return true;







if(
bet.type==="19-36" &&
number>=19 &&
number<=36

)

return true;







if(
bet.type==="even" &&
number!==0 &&
number%2===0

)

return true;







if(
bet.type==="odd" &&
number!==0 &&
number%2!==0

)

return true;







return false;



}









function finishRoulette(){



let number = Math.floor(

Math.random()*37

);






roulette.result={


number:number,


color:getNumberColor(number),


time:Date.now()


};






roulette.history.unshift({

number:number,

color:getNumberColor(number),

date:new Date().toLocaleString()

});







if(roulette.history.length>20)

roulette.history.pop();







roulette.bets.forEach(bet=>{



if(checkWin(bet,number)){



let user=users.find(

u=>

String(u.id)===String(bet.id)

);



if(user){



user.balance += bet.amount*2;



if(!user.rouletteHistory)

user.rouletteHistory=[];



user.rouletteHistory.unshift({


number:number,


win:bet.amount*2,


date:new Date().toLocaleString()


});



}



}



});






saveUsers();



roulette.bets=[];



roulette.started=Date.now();





}
// ===================================
// AUTO FINISH ROUND
// ===================================


setInterval(()=>{


if(

getRouletteTime()<=0

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



users=JSON.parse(

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









// ===================================
// PROMO GENERATOR
// ===================================


function generatePromo(){



let code;



do{


code=

"URAL-"+

Math.random()

.toString(36)

.substring(2,8)

.toUpperCase();



}

while(

users.some(

u=>

u.promoCode===code

)

);




return code;



}









// ===================================
// API KEY
// ===================================


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









// ===================================
// CREATE / SYNC USER
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








let user=users.find(

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

data.name || user.name;


user.username=

data.username || user.username;


user.photo=

data.photo || user.photo;






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



let user=users.find(

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



let user=users.find(

u=>

String(u.id)===String(req.body.id)

);





if(user){


user.balance=

Number(req.body.balance || 0);



saveUsers();



}



res.json({

success:true

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







if(!amount || amount<=0){


return res.json({

success:false,

message:"Неверная сумма"

});


}







if(user.balance < amount){


return res.json({

success:false,

message:"Недостаточно U"

});


}







if(getRouletteTime()<=0){


return res.json({

success:false,

message:"Раунд завершён"

});


}







user.balance-=amount;








roulette.bets.push({


id:id,


type:type,


amount:amount



});






saveUsers();






res.json({


success:true,


message:"Ставка принята"



});



});









// ===================================
// ROULETTE STATE
// ===================================


app.get(

"/roulette/state",

(req,res)=>{



res.json({



active:true,



timeLeft:

Math.max(

0,

getRouletteTime()

),




result:

roulette.result,




bets:

roulette.bets.length




});



});









// ===================================
// ROULETTE HISTORY
// ===================================


app.get(

"/roulette/history",

(req,res)=>{



res.json({


history:

roulette.history



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


return(

u.name.toLowerCase()

.includes(q)



||

(u.username||"")

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

user.activatedCodes.includes(code)

){



return res.json({

success:false,

message:"Уже использован"

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


history:

user.history || []

});



});









// ===================================
// ROOT
// ===================================


app.get(

"/",

(req,res)=>{



res.send(

"URALcoin server v20 FINAL online"

);



});









// ===================================
// START
// ===================================


app.listen(

PORT,

()=>{


console.log(

"URALcoin v20 started",

PORT

);



});
