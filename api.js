// UralCoin API CONNECT v1


const API_URL = "https://ТВОЙ-RAILWAY-АДРЕС.up.railway.app";




// создание или получение игрока


async function syncUser(){



const player =
Storage.getPlayer();





if(!player.id)
return null;





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



});






const user =
await response.json();






player.balance =
user.balance;



player.friends =
user.friends;



player.referrer =
user.referrer;



Storage.savePlayer(player);




return user;



}









// отправка баланса на сервер


async function syncBalance(){



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









// получить топ


async function getTop(){



const response =
await fetch(

API_URL + "/top"

);



return await response.json();



}









// отправить реферала


async function sendReferral(
referrerId
){



const player =
Storage.getPlayer();





await fetch(

API_URL+"/referral",

{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({

userId:player.id,

referrerId:referrerId


})


}



);



}








window.API = {


syncUser,


syncBalance,


getTop,


sendReferral


};
