// =================================
// URALcoin Storage v5
// Единое хранилище игрока
// =================================



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

0.010,



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



createdPromos:

[]



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







setTelegramUser(data){



let player =

this.getPlayer();





player.id =

String(data.id);



player.name =

data.first_name ||

data.name ||

"Игрок";





player.username =

data.username ||

"";





player.photo =

data.photo_url ||

"";





this.savePlayer(player);



},







updateBalance(value){



let player =

this.getPlayer();





player.balance =

Number(value);



this.savePlayer(player);



},







addBalance(value){



let player =

this.getPlayer();





player.balance +=

Number(value);



this.savePlayer(player);



},







removeBalance(value){



let player =

this.getPlayer();





if(
player.balance < value
){


return false;


}




player.balance -=

Number(value);



this.savePlayer(player);



return true;



},







addFriend(){



let player =

this.getPlayer();



player.friends += 1;



this.savePlayer(player);



},







setReferrer(id){



let player =

this.getPlayer();





if(

!player.referrer

&&

String(id)!==String(player.id)

){



player.referrer =

String(id);



this.savePlayer(player);



}



},







addHistory(item){



let player =

this.getPlayer();





player.history.unshift(item);



this.savePlayer(player);



},







getHistory(){



return this.getPlayer()
.history || [];



},







createApiKey(){



const key =

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



},







clear(){



localStorage.removeItem(

"ural_player"

);



}





};








window.Storage = Storage;
