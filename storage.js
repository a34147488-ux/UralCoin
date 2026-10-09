// =====================================
// URALcoin STORAGE v1
// Local Player Storage
// =====================================



const Storage = {





savePlayer(player){



if(!player)

return;



localStorage.setItem(

"URAL_player",

JSON.stringify(player)

);



},







getPlayer(){



let data =

localStorage.getItem(

"URAL_player"

);





if(!data){



return {

id:null,

username:"",

balance:0,

click_power:0.01,

second_power:0,

friends:0,

earned_from_promo:0,

promo_code:""

};



}






try{



return JSON.parse(data);



}

catch(e){



console.log(

"Storage error",

e

);



return null;



}



},







updatePlayer(data){



let player =

this.getPlayer();





if(!player)

player={};







Object.assign(

player,

data

);






this.savePlayer(

player

);






return player;



},







clear(){



localStorage.removeItem(

"URAL_player"

);



}






};









window.Storage = Storage;
