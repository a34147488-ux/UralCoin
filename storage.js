// ===================================
// URALcoin STORAGE v16
// Stable Local Database
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


id:"",


name:"Игрок",


username:"",


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
// FIX OLD DATA
// ===============================



if(!player.id)

player.id="";



if(!player.username)

player.username="";



if(!player.photo)

player.photo="";



if(!player.activatedCodes)

player.activatedCodes=[];



if(!player.upgrades)

player.upgrades={};



if(!player.history)

player.history=[];



if(!player.promoCode)

player.promoCode="";



if(!player.friends)

player.friends=0;



if(!player.earnedFromPromo)

player.earnedFromPromo=0;





player.balance =
Number(player.balance || 0);



player.clickPower =
Number(player.clickPower || 0.01);



player.autoPower =
Number(player.autoPower || 0);






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






if(

player.balance < amount

){


return false;


}






player.balance -=

Number(amount);



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



return this.getPlayer().history || [];



},









// ===============================
// API KEY
// ===============================



generateApiKey(){



let key =

"URAL-" +

Math.random()

.toString(36)

.substring(2,15)

.toUpperCase();




let player=this.getPlayer();



player.apiKey=key;



this.savePlayer(player);



return key;



},






getApiKey(){


return this.getPlayer().apiKey || "";



},







clear(){



localStorage.removeItem(

"ural_player"

);



}



};





window.Storage = Storage;
