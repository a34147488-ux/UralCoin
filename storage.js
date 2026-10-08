// ===================================
// URALcoin STORAGE v7
// Referral + Workers + Stable Player
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


player.workers =
player.workers || [];


player.referralRewarded =
player.referralRewarded || [];


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







// ===============================
// TELEGRAM PROFILE
// ===============================


updateTelegramProfile(data){


let player=this.getPlayer();



if(data.id)

player.id=String(data.id);


if(data.username)

player.username=data.username;


if(data.first_name)

player.name=data.first_name;


if(data.photo_url)

player.photo=data.photo_url;



this.savePlayer(player);



},







// ===============================
// REFERRAL SYSTEM
// ===============================


setReferrer(id){


let player=this.getPlayer();



if(player.referrer)

return false;



if(String(id)===String(player.id))

return false;



player.referrer=String(id);



this.savePlayer(player);



return true;



},







addReferral(worker){


let player=this.getPlayer();



let exists = player.workers.find(

w=>String(w.id)===String(worker.id)

);



if(exists)

return false;



player.workers.push({


id:String(worker.id),


name:worker.name || "Игрок",


photo:worker.photo || "",


level:1,


earned:0,


joined:Date.now()



});



player.friends++;


player.invited++;



this.savePlayer(player);



return true;



},







giveReferralBonus(workerId, amount=5000){


let player=this.getPlayer();



if(
player.referralRewarded.includes(
String(workerId)
)

)

return false;



player.balance += Number(amount);



player.referralRewarded.push(
String(workerId)
);



this.addHistory({

type:"referral",


amount:amount,


date:new Date().toLocaleString()



});



this.savePlayer(player);



return true;



},







getWorkers(){


return this.getPlayer().workers;


},







upgradeWorker(id){


let player=this.getPlayer();



let worker =
player.workers.find(

w=>String(w.id)===String(id)

);



if(!worker)

return false;



if(worker.level>=50)

return false;



worker.level++;



this.savePlayer(player);



return worker;



},







getReferralCount(){


return this.getPlayer().workers.length;


},







getTopReferrals(){


let player=this.getPlayer();



return player.workers

.sort(

(a,b)=>

b.level-a.level

);



},







// ===============================
// BALANCE
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



player.balance-=Number(amount);



this.savePlayer(player);



return true;



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
// API KEY
// ===============================


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
