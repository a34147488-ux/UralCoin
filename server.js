// =====================================
// URALcoin SERVER v1
// Railway Backend
// =====================================


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";


import {
initDatabase,
getDB
}
from "./database.js";




dotenv.config();




const app = express();





app.use(cors());


app.use(express.json());





const PORT = process.env.PORT || 3000;





await initDatabase();


const db = getDB();








// =====================================
// CREATE / GET PLAYER
// =====================================


app.post("/player", async(req,res)=>{


try{


const {

id,
username="",
first_name="",
avatar="",
ref=""

}=req.body;






let player = await db.get(

"SELECT * FROM users WHERE id=?",

[id]

);







if(!player){



let promo =

"URAL" +

Math.floor(

Math.random()*999999

);





let apiKey =

crypto.randomBytes(16)

.toString("hex");







await db.run(

`

INSERT INTO users

(

id,
username,
first_name,
avatar,
promo_code,
api_key,
invited_by,
created

)

VALUES

(?,?,?,?,?,?,?,?)

`,

[

id,
username,
first_name,
avatar,
promo,
apiKey,
ref,
Date.now()

]

);






// бонус пригласившему


if(ref && ref !== id){


let inviter = await db.get(

"SELECT * FROM users WHERE id=?",

[ref]

);



if(inviter){


await db.run(

`

UPDATE users

SET balance=balance+5000,

friends=friends+1,

earned_from_promo=earned_from_promo+5000

WHERE id=?

`,

[ref]

);



}



}





player = await db.get(

"SELECT * FROM users WHERE id=?",

[id]

);



}





res.json(player);



}

catch(e){


res.status(500).json({

error:e.message

});


}



});









// =====================================
// CLICK
// =====================================


app.post("/click",async(req,res)=>{


let {id}=req.body;



let user = await db.get(

"SELECT * FROM users WHERE id=?",

[id]

);



if(!user)

return res.json({

success:false

});





await db.run(

`

UPDATE users

SET balance=balance+?

WHERE id=?

`,

[

user.click_power,

id

]

);






res.json({

success:true

});



});









// =====================================
// TOP
// =====================================


app.get("/top",async(req,res)=>{


let list = await db.all(

`

SELECT *

FROM users

ORDER BY balance DESC

LIMIT 50

`

);



res.json(list);



});









// =====================================
// PROMO ACTIVATE
// =====================================


app.post("/promo",async(req,res)=>{


let {

id,
code

}=req.body;





let owner = await db.get(

"SELECT * FROM users WHERE promo_code=?",

[code]

);





if(!owner)

return res.json({

success:false,

message:"Код не найден"

});






if(owner.id===id)

return res.json({

success:false,

message:"Свой код нельзя"

});







await db.run(

`

UPDATE users

SET balance=balance+5000

WHERE id=?

`,

[id]

);






await db.run(

`

INSERT INTO promo_history

(user_id,promo,reward,date)

VALUES(?,?,?,?)

`,

[

id,
code,
5000,
Date.now()

]

);







res.json({

success:true,

message:"+5000 U"

});




});









// =====================================
// TRANSFER
// =====================================


app.post("/transfer",async(req,res)=>{


let {

from,
to,
amount

}=req.body;





let sender = await db.get(

"SELECT * FROM users WHERE id=?",

[from]

);





let receiver = await db.get(

"SELECT * FROM users WHERE id=?",

[to]

);






if(!sender || !receiver)

return res.json({

success:false,

message:"Игрок не найден"

});






if(sender.balance < amount)

return res.json({

success:false,

message:"Недостаточно средств"

});







await db.run(

"UPDATE users SET balance=balance-? WHERE id=?",

[amount,from]

);





await db.run(

"UPDATE users SET balance=balance+? WHERE id=?",

[amount,to]

);







await db.run(

`

INSERT INTO transfers

(from_id,to_id,amount,date)

VALUES(?,?,?,?)

`,

[

from,
to,
amount,
Date.now()

]

);






res.json({

success:true

});



});









// =====================================
// API KEY
// =====================================


app.get("/apikey/:id",async(req,res)=>{


let user = await db.get(

"SELECT api_key FROM users WHERE id=?",

[req.params.id]

);



res.json(user);



});









// =====================================
// ROULETTE STATE
// =====================================


let roulette = {


time:25,


number:null


};






setInterval(()=>{


roulette.time--;



if(roulette.time<=0){



roulette.number =

Math.floor(

Math.random()*37

);




db.run(

`

INSERT INTO roulette_history

(number,color,date)

VALUES(?,?,?)

`,

[

roulette.number,

roulette.number===0?

"green":

"red",

Date.now()

]

);



roulette.time=25;


}



},1000);









app.get("/roulette/state",(req,res)=>{


res.json({

timeLeft:roulette.time,

result:{

number:roulette.number

}

});


});







app.get("/roulette/history",async(req,res)=>{


let history = await db.all(

`

SELECT *

FROM roulette_history

ORDER BY id DESC

LIMIT 20

`

);



res.json({

history

});



});









app.listen(PORT,()=>{


console.log(

"URALcoin SERVER STARTED",

PORT

);


});
