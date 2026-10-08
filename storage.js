// ===================================
// URALcoin STORAGE v13.1
// Stable Player Database
// Personal Promo System
// ===================================



const Storage = {



getPlayer(){



let player = JSON.parse(

localStorage.getItem(

"ural_player"

)

);








if(!player){



player={


id:"guest",



name:"Игрок",



photo:"",



balance:0,



clickPower:0.01,



autoPower:0,



crystals:0,



friends:0,



promoCode:"",



activatedCodes:[],



earnedFromPromo:0,



upgrades:{},



history:[],



created:Date.now()



};



}










// ===============================
// FIX OLD USERS
// ===============================



if(!player.upgrades)

player.upgrades={};




if(!player.activatedCodes)

player.activatedCodes=[];




if(!player.history)

player.history=[];




if(!player.promoCode)

player.promoCode="";




if(!player.earnedFromPromo)

player.earnedFromPromo=0;




if(!player.crystals)

player.crystals=0;





if(!player.friends)

player.friends=0;









player.balance =

Number(player.balance || 0);






player.clickPower =

Number(player.clickPower || 0.01);






player.autoPower =

Number(player.autoPower || 0);







this.savePlayer(player);






return player;



},










// ===============================
// SAVE
// ===============================


savePlayer(player){



localStorage.setItem(

"ural_player",

JSON.stringify(player)

);



},










// ===============================
// TELEGRAM DATA
// ===============================



updateTelegramProfile(data){



let player=this.getPlayer();






if(data.id)

player.id=

String(data.id);






if(data.first_name)

player.name=

data.first_name;







if(data.username)

player.username=

data.username;






if(data.photo_url)

player.photo=

data.photo_url;






this.savePlayer(player);



},










// ===============================
// BALANCE
// ===============================


addBalance(amount){



let player=this.getPlayer();





player.balance +=

Number(amount);





this.savePlayer(player);



},











removeBalance(amount){



let player=this.getPlayer();






if(player.balance < amount)

return false;







player.balance -=

Number(amount);






this.savePlayer(player);






return true;



},










// ===============================
// PERSONAL PROMO
// ===============================



setPromoCode(code){



let player=this.getPlayer();





player.promoCode=

code;






this.savePlayer(player);



},











activatePromo(code){



let player=this.getPlayer();







code=

String(code)

.toUpperCase();








if(

player.activatedCodes.includes(code)

)

return false;







player.activatedCodes.push(code);







this.savePlayer(player);







return true;



},










// ===============================
// HISTORY
// ===============================



addHistory(item){



let player=this.getPlayer();







player.history.push(item);







this.savePlayer(player);



},











getHistory(){



return this.getPlayer().history;



},










// ===============================
// CLEAR
// ===============================



clear(){



localStorage.removeItem(

"ural_player"

);



}






};






window.Storage = Storage;
