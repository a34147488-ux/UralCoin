// =====================================
// URALcoin SERVER v1
// Telegram + API
// =====================================


const express = require("express");

const cors = require("cors");

const path = require("path");

const TelegramBot = require("node-telegram-bot-api");



const {

initDatabase,

getPlayer,

createPlayer,

updatePlayer

} = require("./database");







const app = express();





app.use(cors());

app.use(express.json());





// =====================================
// STATIC
// =====================================


app.use(

express.static(

path.join(__dirname,"public")

)

);









// =====================================
// DATABASE
// =====================================


initDatabase();









// =====================================
// TELEGRAM
// =====================================



const BOT_TOKEN =

process.env.BOT_TOKEN;





let bot = null;






if(BOT_TOKEN){



bot = new TelegramBot(

BOT_TOKEN,

{

polling:true

}

);





bot.onText(

/\/start(.*)/,

(msg,match)=>{



let id =

String(msg.from.id);





let username =

msg.from.username || "";





let first =

msg.from.first_name || "";





let ref = null;





if(match[1]){


ref = match[1].trim();



}








createPlayer(

{

id,

username,

first_name:first,

avatar:"",

ref

}

);



bot.sendMessage(

msg.chat.id,

"URALcoin запущен 🚀"

);



});



}









// =====================================
// PLAYER
// =====================================


app.post(

"/player",

(req,res)=>{



let id =

String(req.body.id);






getPlayer(

id,

(player)=>{





if(!player){



return res.json({

success:false

});



}






res.json({

success:true,

player

});





}



);



}

);









// =====================================
// CLICK
// =====================================


app.post(

"/click",

(req,res)=>{



let id =

String(req.body.id);







getPlayer(

id,

(player)=>{



if(!player)

return res.json({

success:false

});








player.balance +=

player.click_power;








updatePlayer(

id,

player

);






res.json({

success:true,

balance:player.balance

});



}



);



}

);









// =====================================
// SERVER
// =====================================


const PORT =

process.env.PORT || 3000;






app.listen(

PORT,

()=>{


console.log(

"URALcoin server started",

PORT

);


}

);
