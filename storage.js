// ===================================
// URALcoin STORAGE v10
// Player + Referrals + Upgrades
// ===================================



const Storage = {



getPlayer(){



let player =

JSON.parse(

localStorage.getItem(
"ural_player"
)

);






if(!player){



player = {


id:

localStorage.getItem(
"telegram_id"
)

||

"guest",



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



referralRewarded:[],



history:[],



usedPromos:[],



apiKey:null,





// улучшения

upgrades:{


PURGANIS:{

level:0,

price:100,

power:0.05

},



PURLES:{

level:0,

price:500,

power:0.10

},



VLADESTOK:{

level:0,

price:2500,

power:0.50

},



PURPUR:{

level:0,

price:10000,

power:1

},



PURUS:{

level:0,

price:25000,

power:3

},



VLADET:{

level:0,

price:75000,

power:8

},



VLADIKAZ:{

level:0,

price:200000,

power:20

}



}



};



}





// защита данных


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






if(!player.upgrades){



player.upgrades={};



}







const defaultUpgrades={


PURGANIS:{
level:0,
price:100,
power:0.05
},


PURLES:{
level:0,
price:500,
power:0.10
},


VLADESTOK:{
level:0,
price:2500,
power:0.50
},


PURPUR:{
level:0,
price:10000,
power:1
},


PURUS:{
level:0,
price:25000,
power:3
},


VLADET:{
level:0,
price:75000,
power:8
},


VLADIKAZ:{
level:0,
price:200000,
power:20
}


};







Object.keys(defaultUpgrades)

.forEach(key=>{



if(!player.upgrades[key]){


player.upgrades[key]=

defaultUpgrades[key];


}



});







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







// ===============================
// TELEGRAM
// ===============================



updateTelegram(data){



let player=this.getPlayer();



if(data.id)

player.id=String(data.id);



if(data.username)

player.username=data.username;



if(data.name)

player.name=data.name;



if(data.photo)

player.photo=data.photo;






this.savePlayer(player);



},







// ===============================
// REFERRALS
// ===============================



setReferrer(id){



let player=this.getPlayer();



if(player.referrer)

return false;



if(String(id)===String(player.id))

return false;






player.referrer =
String(id);



this.savePlayer(player);



return true;



},







addReferral(worker){



let player=this.getPlayer();



let exist =

player.workers.find(

w=>

String(w.id)

===

String(worker.id)

);





if(exist)

return false;






player.workers.push({


id:String(worker.id),


name:worker.name || "Игрок",


photo:worker.photo || "",



level:1,


joined:Date.now()



});






player.friends++;



player.invited++;






this.savePlayer(player);



return true;



},







giveReferralBonus(id,amount=5000){



let player=this.getPlayer();





if(

player.referralRewarded.includes(
String(id)
)

)

return false;






player.balance +=

Number(amount);






player.referralRewarded.push(
String(id)
);






this.addHistory({

text:

"Бонус за реферала +"+amount+" U",


date:

new Date()

.toLocaleString(
"ru-RU"
)


});





this.savePlayer(player);



return true;



},







// ===============================
// UPGRADES
// ===============================



buyUpgrade(name){



let player=this.getPlayer();





let up =

player.upgrades[name];







if(!up)

return false;







if(player.balance < up.price)

return false;







player.balance -=

up.price;







player.clickPower +=

up.power;







up.level++;






up.price =

Math.floor(
up.price * 1.8
);







this.savePlayer(player);





return true;



},







getUpgrades(){



return this.getPlayer().upgrades;



},







// ===============================
// HISTORY
// ===============================



addHistory(data){



let player=this.getPlayer();



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

"URAL-"

+

Math.random()

.toString(36)

.substring(2,12)

.toUpperCase();





let player=this.getPlayer();



player.apiKey=key;



this.savePlayer(player);



return key;



},







getApiKey(){



return this.getPlayer().apiKey || null;



}



};





window.Storage = Storage;
