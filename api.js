// UralCoin API CONNECT v2
// Связь приложения с сервером


const API_URL =

"https://ТВОЙ-АДРЕС-RAILWAY.up.railway.app";







const API = {





async syncUser(){



try{



const player =
Storage.getPlayer();





if(
!player.id
){

return null;

}







const response =

await fetch(

API_URL + "/user",

{


method:"POST",



headers:{


"Content-Type":"application/json"


},



body:JSON.stringify({


id:player.id,


name:player.name,


username:player.username,


photo:player.photo


})


}



);








const serverPlayer =
await response.json();






player.balance =

Number(
serverPlayer.balance || 0
);






player.friends =

Number(
serverPlayer.friends || 0
);






player.referrer =

serverPlayer.referrer ||
null;






Storage.savePlayer(player);






return serverPlayer;



}

catch(error){



console.log(

"API sync error",

error

);



return null;


}



},










async syncBalance(){



try{



const player =
Storage.getPlayer();






await fetch(

API_URL + "/balance",

{


method:"POST",



headers:{


"Content-Type":"application/json"


},



body:JSON.stringify({


id:player.id,


balance:player.balance


})


}



);





}

catch(error){


console.log(

"Balance sync error",

error

);



}



},










async getTop(){



try{



const response =

await fetch(

API_URL + "/top"

);





return await response.json();



}

catch(error){



console.log(

"Top error",

error

);



return [];

}



},










async sendReferral(referrerId){



try{



const player =
Storage.getPlayer();






await fetch(

API_URL + "/referral",

{


method:"POST",



headers:{


"Content-Type":"application/json"


},



body:JSON.stringify({


userId:player.id,


referrerId:String(referrerId)


})


}



);






}

catch(error){



console.log(

"Referral error",

error

);



}



}





};







window.API = API;
