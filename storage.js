// UralCoin Storage v4
// Единый профиль игрока


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










updateProfile(data){



let player =
this.getPlayer();





if(data.id)
player.id =
String(data.id);




if(data.name)
player.name =
data.name;





if(data.username)
player.username =
data.username;





if(data.photo)
player.photo =
data.photo;






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





if(
player.balance < Number(amount)
){


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






if(
!player.referrer
){



player.referrer =
String(id);



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










savePromo(code){



let player =
this.getPlayer();





player.usedPromos.push(code);



this.savePlayer(player);



},










hasPromo(code){



let player =
this.getPlayer();





return player.usedPromos.includes(code);



},










generateApiKey(){



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



}





};







window.Storage =
Storage;
