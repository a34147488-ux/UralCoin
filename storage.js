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
[]


};





this.savePlayer(
player
);



}




return player;



},







savePlayer(player){



localStorage.setItem(

"ural_player",

JSON.stringify(player)

);



},







updateBalance(amount){



let player =
this.getPlayer();



player.balance =
amount;



this.savePlayer(
player
);



},







addBalance(amount){



let player =
this.getPlayer();



player.balance +=
amount;



this.savePlayer(
player
);



},







removeBalance(amount){



let player =
this.getPlayer();





if(
player.balance < amount
){

return false;

}





player.balance -=
amount;



this.savePlayer(
player
);



return true;



},







addFriend(){



let player =
this.getPlayer();



player.friends += 1;



this.savePlayer(
player
);



},







addHistory(data){



let player =
this.getPlayer();



player.history.push(
data
);



this.savePlayer(
player
);



},







getHistory(){



return this.getPlayer()
.history;



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
