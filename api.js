// ===================================
// URALcoin API v17
// Server Connection
// ===================================


const API = {



async request(url, options = {}){


try{


let response = await fetch(

CONFIG.API_URL + url,

options

);



let data = await response.json();


return data;



}

catch(e){


console.log(
"API ERROR",
e
);



return null;


}


},







// ===============================
// CREATE / UPDATE USER
// ===============================


async syncUser(){



let player =
Storage.getPlayer();





if(!player.id){


console.log(
"NO TELEGRAM ID"
);


return null;


}







let data = await this.request(

"/user",

{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({


id:String(player.id),


name:player.name || "Игрок",


username:player.username || "",


photo:player.photo || ""


})



}



);







return data;



},









// ===============================
// SYNC BALANCE
// ===============================


async syncBalance(){



let player =
Storage.getPlayer();





if(!player.id)

return;







await this.request(

"/sync",

{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({


id:String(player.id),


balance:Number(player.balance || 0)


})



}



);



}







};







window.API = API;
