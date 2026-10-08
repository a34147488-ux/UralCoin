const express = require("express");
const cors = require("cors");


const app = express();


app.use(cors());

app.use(express.json());



let users = [];



// создание игрока

app.post("/user", (req,res)=>{


    const data = req.body;



    let user = users.find(
        u => u.id == data.id
    );



    if(!user){


        user = {

            id:data.id,

            name:data.name || "Игрок",

            balance:0,

            invited:0,

            clickPower:0.01

        };


        users.push(user);

    }



    res.json(user);


});





// получение игрока

app.get("/user/:id",(req,res)=>{


    let user =
    users.find(
        u=>u.id == req.params.id
    );



    res.json(
        user || null
    );


});





// сохранение баланса

app.post("/balance",(req,res)=>{


    const {id,balance}=req.body;



    let user =
    users.find(
        u=>u.id==id
    );



    if(user){

        user.balance=balance;

    }



    res.json({
        success:true
    });


});





app.listen(3000,()=>{

console.log(
"UralCoin server started"
);

});
