// ===================================
// URALcoin STORAGE v10
// Stable Storage + Upgrades + Referrals
// ===================================


const Storage = {



getPlayer(){


let player =
JSON.parse(
localStorage.getItem("ural_player")
);



if(!player){


player = {


id:
localStorage.getItem("telegram_id") || "guest",


username:"",


name:"Игрок",


photo:"",


balance:0,


clickPower:0.01,


autoPower:0,


friends:0,


invited:0,


referrer:null,


workers:[],


history:[],


usedPromos:[],


apiKey:null,



upgrades:{}



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



player.workers =
player.workers || [];



player.history =
player.history || [];



player.usedPromos =
player.usedPromos || [];



player.upgrades =
player.upgrades || {};



this.savePlayer(player);



return player;


},







savePlayer(player){


localStorage.setItem(

"ural_player",

JSON.stringify(player)

);


},







updateTelegram(data){


let player =
this.getPlayer();



if(data.id)
player.id =
String(data.id);



if(data.username)
player.username =
data.username;



if(data.name)
player.name =
data.name;



if(data.photo)
player.photo =
data.photo;



this.savePlayer(player);



},









// ===============================
// BALANCE
// ===============================



addBalance(amount){


let player =
this.getPlayer();


player.balance +=
Number(amount);



this.savePlayer(player);


},






removeBalance(amount){


let player =
this.getPlayer();



if(player.balance < amount)

return false;



player.balance -=
Number(amount);



this.savePlayer(player);



return true;


},









// ===============================
// REFERRALS
// ===============================



setReferrer(id){


let player =
this.getPlayer();



if(player.referrer)

return false;



if(
String(player.id)
===
String(id)
)

return false;



player.referrer =
String(id);



this.savePlayer(player);



return true;


},







addFriend(data){


let player =
this.getPlayer();



let exists =
player.workers.find(

w =>
String(w.id)
===
String(data.id)

);



if(exists)

return false;




player.workers.push({


id:String(data.id),


name:data.name || "Игрок",


photo:data.photo || "",


level:1



});



player.friends++;

player.invited++;



this.savePlayer(player);



return true;


},







giveReferralBonus(id){


let player =
this.getPlayer();



if(
player.workersBonus &&
player.workersBonus.includes(String(id))
)

return false;



player.balance += 5000;



if(!player.workersBonus)

player.workersBonus=[];



player.workersBonus.push(
String(id)
);



this.addHistory({


text:
"Бонус за реферала +5000 U",


date:
new Date()
.toLocaleString()

});



this.savePlayer(player);



return true;


},










// ===============================
// UPGRADE SYSTEM
// ===============================



getUpgrades(){


return {


PURGANIS:{
power:0.01,
price:100
},


PURLES:{
power:0.025,
price:500
},


VLADESTOK:{
power:0.05,
price:2500
},


PURPUR:{
power:0.1,
price:10000
},


PURUS:{
power:0.25,
price:50000
},


VLADET:{
power:0.5,
price:150000
},


VLADIKAZ:{
power:1,
price:500000
}


};


},







buyUpgrade(name){


let player =
this.getPlayer();



let list =
this.getUpgrades();



let upgrade =
list[name];



if(!upgrade)

return false;



let level =
player.upgrades[name] || 0;



let price =
upgrade.price *
(level+1);





if(player.balance < price)

return false;



player.balance -= price;



player.clickPower +=
upgrade.power;



player.upgrades[name] =
level+1;



this.savePlayer(player);



return true;


},







getUpgradeLevel(name){


let player =
this.getPlayer();



return player.upgrades[name] || 0;


},









// ===============================
// HISTORY
// ===============================


addHistory(data){


let player =
this.getPlayer();



player.history.push(data);



this.savePlayer(player);


},






getHistory(){


return this.getPlayer().history;


},









// ===============================
// API
// ===============================


generateApiKey(){


let key =

"URAL-" +

Math.random()
.toString(36)
.substring(2,12)
.toUpperCase();



let player =
this.getPlayer();



player.apiKey =
key;



this.savePlayer(player);



return key;


},






getApiKey(){


return this.getPlayer().apiKey || null;


}



};




window.Storage = Storage;
