const Storage = {



get(key, defaultValue){


let data =
localStorage.getItem(key);



if(data === null){

return defaultValue;

}



try{


return JSON.parse(data);


}

catch{


return data;


}



},






set(key,value){



localStorage.setItem(

key,

JSON.stringify(value)

);


},







getPlayer(){



return this.get(
"player",
{

id:
localStorage.getItem(
"telegram_id"
)
||
"guest",


name:
"Игрок",


balance:
0,


clickPower:
0.01,


autoPower:
0,


friends:
0,


promos:[],


history:[]


}

);



},







savePlayer(player){



this.set(
"player",
player
);



},








addBalance(amount){



let player =
this.getPlayer();



player.balance += amount;



this.savePlayer(
player
);



return player.balance;



},







removeBalance(amount){



let player =
this.getPlayer();



if(player.balance < amount){

return false;


}



player.balance -= amount;



this.savePlayer(
player
);



return true;


},







addFriend(){



let player =
this.getPlayer();



player.friends++;



this.savePlayer(
player
);



},







addHistory(data){



let player =
this.getPlayer();



player.history.push(data);



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

"api_key",

key

);



return key;


},






getApiKey(){



return localStorage.getItem(
"api_key"
);



}






};





window.Storage =
Storage;
