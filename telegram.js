// UralCoin Telegram Connect v2


const tg = window.Telegram.WebApp;



tg.ready();

tg.expand();



// цвета Telegram

tg.setHeaderColor("#090414");

tg.setBackgroundColor("#090414");





const user =

tg.initDataUnsafe?.user;







async function connectPlayerToServer(player){


try{


await fetch(

CONFIG.API_URL + "/user",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify(player)


}

);



console.log(

"Игрок подключен к серверу"

);



}

catch(error){



console.log(

"Ошибка сервера:",

error

);



}



}









if(user){



localStorage.setItem(

"telegram_id",

user.id

);







const avatar =

document.getElementById(

"userAvatar"

);




const letter =

document.getElementById(

"avatarLetter"

);







if(user.photo_url){



avatar.src =

user.photo_url;



avatar.style.display =

"block";



if(letter){

letter.style.display =

"none";

}



}

else{



if(letter){



letter.innerText =

(

user.first_name ||

"U"

)

.charAt(0)

.toUpperCase();



}



}









let player =

JSON.parse(

localStorage.getItem(

"player"

)

)

|| {};







player.id =

user.id;





player.name =

user.first_name ||

"Игрок";





player.photo =

user.photo_url ||

"";







localStorage.setItem(

"player",

JSON.stringify(player)

);








// отправка на Railway


connectPlayerToServer(

{

id:player.id,


name:player.name,


photo:player.photo


}

);








}







else{





let player =

JSON.parse(

localStorage.getItem(

"player"

)

)

|| {};






if(!player.id){



player.id =

"guest";



player.name =

"Игрок";





localStorage.setItem(

"player",

JSON.stringify(player)

);



}



}
