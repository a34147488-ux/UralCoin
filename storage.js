// ===================================
// URALcoin STORAGE v6
// Stable Player Storage
// ===================================


const Storage = {


getPlayer(){


let player = JSON.parse(

localStorage.getItem("ural_player")

);



if(!player){


player = JSON.parse(

localStorage.getItem("player")

);


}




if(!player){


player = {


id:
localStorage.getItem("telegram_id") || "guest",


name:
"Игрок",


photo:
"",


balance:0,


clickPower:0.01,


autoPower:0,


friends:0,


invited:0,


referrer:null,


history:[],


usedPromos:[],


apiKey:null


};



}




player.id =
player.id || "guest";


player.name =
player.name || "Игрок";


player.balance =
Number(player.balance || 0);


player.clickPower =
Number(player.clickPower || 0.01);


player.autoPower =
Number(player.autoPower || 0);


player.friends =
Number(player.friends || 0);


player.invited =
Number(player.invited || 0);


player.history =
player.history || [];


player.usedPromos =
player.usedPromos || [];



this.savePlayer(player);



return player;


},







savePlayer(player){



localStorage.setItem(

"ural_player",

JSON.stringify(player)

);



localStorage.setItem(

"player",

JSON.stringify(player)

);



},







setReferrer(id){


let player=this.getPlayer();



if(
player.referrer
)

return;



player.referrer =
String(id);



this.savePlayer(player);



},







addBalance(amount){


let player=this.getPlayer();



player.balance += Number(amount);



this.savePlayer(player);



},







removeBalance(amount){


let player=this.getPlayer();



if(player.balance < amount)

return false;



player.balance -= Number(amount);



this.savePlayer(player);



return true;



},







addFriend(){


let player=this.getPlayer();



player.friends++;

player.invited++;



this.savePlayer(player);



},







addHistory(data){


let player=this.getPlayer();



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



let player=this.getPlayer();



player.apiKey=key;



this.savePlayer(player);



localStorage.setItem(

"ural_api",

key

);



return key;



},







getApiKey(){


let player=this.getPlayer();



return player.apiKey ||

localStorage.getItem("ural_api") ||

null;



}


};




window.Storage = Storage;
