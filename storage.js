// ===================================
// URALcoin STORAGE v3
// Единственный профиль игрока
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






invited:

0,






referrer:

null,






history:

[],






usedPromos:

[],






apiKey:

null



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










// обновление Telegram данных



setTelegramUser(user){



let player =

this.getPlayer();






player.id =

String(user.id);





player.name =

user.first_name ||

"Игрок";





player.photo =

user.photo_url ||

player.photo;








this.savePlayer(player);







return player;



},










// баланс



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

player.balance < amount

){

return false;

}






player.balance -=

Number(amount);






this.savePlayer(player);







return true;



},










// рефералы



addFriend(){



let player =

this.getPlayer();






player.friends += 1;






player.invited += 1;






this.savePlayer(player);



},










// история



addHistory(data){



let player =

this.getPlayer();






player.history.push(data);






this.savePlayer(player);



},







getHistory(){



return this.getPlayer()

.history;



},










// API ключ



generateApiKey(){



const key =



"URAL-"

+

Math.random()

.toString(36)

.substring(2,12)

.toUpperCase();







let player =

this.getPlayer();







player.apiKey = key;







this.savePlayer(player);







localStorage.setItem(

"ural_api",

key

);






return key;



},









getApiKey(){



let player =

this.getPlayer();







return (

player.apiKey

||

localStorage.getItem(

"ural_api"

)

||

null

);



}





};







window.Storage = Storage;
