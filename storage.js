// ===================================
// URALcoin STORAGE v10
// Stable Player + Profile + Referrals
// ===================================


const Storage = {




getPlayer(){



let player = JSON.parse(

localStorage.getItem(
"ural_player"
)

);






// перенос старого сохранения


if(!player){


player = JSON.parse(

localStorage.getItem(
"player"
)

);



}








if(!player){



player = {


id:

localStorage.getItem(
"telegram_id"
)

|| "guest",



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








// нормализация данных



player.id =

String(
player.id || "guest"
);




player.name =

player.name || "Игрок";




player.username =

player.username || "";




player.photo =

player.photo || "";




player.balance =

Number(
player.balance || 0
);




player.clickPower =

Number(
player.clickPower || 0.01
);




player.autoPower =

Number(
player.autoPower || 0
);




player.friends =

Number(
player.friends || 0
);




player.invited =

Number(
player.invited || 0
);




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



},









// ===================================
// TELEGRAM PROFILE
// ===================================


updateTelegramProfile(data){



let player = this.getPlayer();




if(data.id)

player.id =
String(data.id);




if(data.username)

player.username =
data.username;




if(data.first_name)

player.name =
data.first_name;




if(data.photo_url)

player.photo =
data.photo_url;






this.savePlayer(player);



},









// ===================================
// REFERRALS
// ===================================



setReferrer(id){



let player=this.getPlayer();





if(player.referrer)

return false;





if(
String(player.id)===String(id)
)

return false;





player.referrer =
String(id);





this.savePlayer(player);





return true;



},








addFriend(){



let player=this.getPlayer();



player.friends++;

player.invited++;



this.savePlayer(player);



},









// ===================================
// BALANCE
// ===================================



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









// ===================================
// HISTORY
// ===================================



addHistory(data){



let player=this.getPlayer();



player.history.push(data);



this.savePlayer(player);



},






getHistory(){



return this.getPlayer().history;



},









// ===================================
// API
// ===================================



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



return key;



},








getApiKey(){



return this.getPlayer().apiKey || null;



}






};





window.Storage = Storage;
