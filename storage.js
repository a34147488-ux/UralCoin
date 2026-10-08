// ===================================
// URALcoin STORAGE v8
// Stable Player + Referrals
// ===================================


const Storage = {



getPlayer(){


let player = JSON.parse(

localStorage.getItem(
"ural_player"
)

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



referralRewarded:[],


workers:[],



history:[],


usedPromos:[],



apiKey:null



};


}





// исправление старых игроков


player.id =
player.id || "guest";


player.name =
player.name || "Игрок";


player.username =
player.username || "";



player.photo =
player.photo || "";



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



player.referralRewarded =
player.referralRewarded || [];



player.workers =
player.workers || [];



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



},









// ===============================
// TELEGRAM DATA
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
// REFERRER
// ===============================



setReferrer(id){



let player=this.getPlayer();



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









// ===============================
// БОНУС ЗА РЕФЕРАЛА
// ===============================



addReferralBonus(workerId){



let player=this.getPlayer();





if(
player.referralRewarded.includes(
String(workerId)
)

)

return false;






player.balance += 5000;



player.friends++;


player.invited++;





player.referralRewarded.push(

String(workerId)

);






player.history.push({


type:"Реферал",


amount:5000,


date:new Date()
.toLocaleString("ru-RU")


});







this.savePlayer(player);



return true;



},









// ===============================
// БАЛАНС
// ===============================



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









// ===============================
// ИСТОРИЯ
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

"URAL-" +

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
