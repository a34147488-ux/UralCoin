// ===================================
// URALcoin STORAGE v4
// Совместимость всех модулей
// ===================================


const Storage = {



getPlayer(){


let player = JSON.parse(

localStorage.getItem(
"ural_player"
)

);




// перенос старого профиля

if(!player){


let old = JSON.parse(

localStorage.getItem(
"player"
)

);



if(old){


player = old;



}

}





if(!player){


player = {


id:

localStorage.getItem(
"telegram_id"
)
||
"guest",


name:

"Игрок",


photo:

"",


balance:

0,


clickPower:

0.01,


autoPower:

0,


friends:

0,


invited:

0,


referrer:

null,


history:

[],


usedPromos:

[],


apiKey:

null



};


}





// обязательные поля

if(player.friends === undefined)

player.friends = 0;



if(player.invited === undefined)

player.invited = player.friends;



if(!player.history)

player.history = [];



if(!player.usedPromos)

player.usedPromos = [];



if(!player.clickPower)

player.clickPower = 0.01;



if(!player.balance)

player.balance = 0;



this.savePlayer(player);



return player;



},







savePlayer(player){


localStorage.setItem(

"ural_player",

JSON.stringify(player)

);



// синхронизация для старых файлов

localStorage.setItem(

"player",

JSON.stringify(player)

);



},







setTelegramUser(user){


let player = this.getPlayer();



player.id = String(user.id);



player.name =

user.first_name ||

"Игрок";



player.photo =

user.photo_url ||

player.photo;



this.savePlayer(player);



return player;



},







updateBalance(amount){


let player = this.getPlayer();



player.balance = Number(amount);



this.savePlayer(player);



},







addBalance(amount){


let player = this.getPlayer();



player.balance += Number(amount);



this.savePlayer(player);



},







removeBalance(amount){


let player = this.getPlayer();



if(player.balance < amount)

return false;



player.balance -= Number(amount);



this.savePlayer(player);



return true;



},







addFriend(){


let player = this.getPlayer();



player.friends++;

player.invited++;



this.savePlayer(player);



},







addHistory(data){


let player = this.getPlayer();



player.history.push(data);



this.savePlayer(player);



},







getHistory(){


return this.getPlayer().history;



},







generateApiKey(){


const key =

"URAL-" +

Math.random()

.toString(36)

.substring(2,12)

.toUpperCase();




let player = this.getPlayer();



player.apiKey = key;



this.savePlayer(player);



localStorage.setItem(

"ural_api",

key

);



return key;



},







getApiKey(){


let player = this.getPlayer();



return (

player.apiKey ||

localStorage.getItem(
"ural_api"
)

||
null

);



}





};




window.Storage = Storage;
