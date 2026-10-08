// UralCoin Storage v3
// Единое хранилище игрока


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



name:
"Игрок",



username:
"",



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



referrer:
null,



history:
[],



usedPromos:
[],



created:
Date.now()


};





this.savePlayer(player);



}






return player;



},







savePlayer(player){



localStorage.setItem(

"ural_player",

JSON.stringify(player)

);



},







setTelegramUser(user){



let player =
this.getPlayer();




player.id =
user.id;



player.name =
user.first_name ||
"Игрок";



player.username =
user.username ||
"";



player.photo =
user.photo_url ||
"";




this.savePlayer(player);



},







updateBalance(amount){



let player =
this.getPlayer();



player.balance =
Number(amount);



this.savePlayer(player);



},







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





if(player.balance < amount){


return false;


}





player.balance -=
Number(amount);



this.savePlayer(player);



return true;



},







addFriend(){



let player =
this.getPlayer();



player.friends +=1;



this.savePlayer(player);



},







setReferrer(id){



let player =
this.getPlayer();





if(!player.referrer){



player.referrer=id;



this.savePlayer(player);



}



},







addHistory(data){



let player =
this.getPlayer();



player.history.push({

...data,

date:
Date.now()


});





this.savePlayer(player);



},







getHistory(){



return this.getPlayer()
.history;



},







buyUpgrade(type,value,price){



let player =
this.getPlayer();





if(player.balance < price){



return false;


}





player.balance -= price;





if(type==="click"){


player.clickPower += value;


}





if(type==="auto"){


player.autoPower += value;


}






this.savePlayer(player);



return true;



},







generateApiKey(){



let key =

"URAL-"

+

Math.random()
.toString(36)
.substring(2,12)
.toUpperCase();





localStorage.setItem(

"ural_api",

key

);



return key;



},







getApiKey(){



return localStorage.getItem(
"ural_api"
)

||

null;



}






};






window.Storage =
Storage;
