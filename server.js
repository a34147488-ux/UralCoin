// ===================================
// URALcoin SERVER v6
// Users + Top System
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






// ============================
// Загрузка базы
// ============================



function loadUsers(){


if(fs.existsSync(DB)){


users = JSON.parse(

fs.readFileSync(
DB,
"utf8"
)

);


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









// ============================
// Создание / обновление игрока
// ============================



app.post(

"/user",

(req,res)=>{



const data = req.body;






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



referrer:null



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











// ============================
// Получить игрока
// ============================



app.get(

"/user/:id",

(req,res)=>{



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









// ============================
// Сохранить баланс
// ============================



app.post(

"/balance",

(req,res)=>{



const id = req.body.id;


const balance = Number(

req.body.balance

);







const user = users.find(

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

success:true

});



});









// ============================
// ТОП ИГРОКОВ
// ============================



app.get(

"/top",

(req,res)=>{





const top =

[...users]

.sort(

(a,b)=>

Number(b.balance)

-

Number(a.balance)

)



.slice(0,50);







res.json(top);



});









// ============================
// Статус сервера
// ============================



app.get(

"/",

(req,res)=>{


res.send(

"URALcoin server online"

);



});









app.listen(

PORT,

()=>{


console.log(

"URALcoin server v6 started"

);


});
