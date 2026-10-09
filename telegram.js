// ===================================
// URALcoin TELEGRAM v16
// Telegram User Connect
// ===================================



function initTelegram(){



let tg = null;



if(
window.Telegram &&
window.Telegram.WebApp
){


tg = window.Telegram.WebApp;


tg.ready();


tg.expand();


}






let userData = null;






if(
tg &&
tg.initDataUnsafe &&
tg.initDataUnsafe.user
){



userData = tg.initDataUnsafe.user;



}








let player = Storage.getPlayer();






if(userData){



player.id = String(

userData.id

);





player.name =

userData.first_name ||

"Игрок";





if(userData.last_name){



player.name +=

" " +

userData.last_name;


}






player.username =

userData.username ||

"";






player.photo =

userData.photo_url ||

"";






}




// запасной вариант

if(!player.id){



let savedId =

localStorage.getItem(

"telegram_id"

);



if(savedId){


player.id = savedId;


}



}







Storage.savePlayer(player);






// профиль


const avatar = document.getElementById(

"userAvatar"

);



const letter = document.getElementById(

"avatarLetter"

);






if(
avatar &&
player.photo
){



avatar.src = player.photo;


avatar.style.display="block";



if(letter){


letter.style.display="none";


}



}






if(
letter &&
player.name
){



letter.innerText =

player.name

.charAt(0)

.toUpperCase();



}






console.log(

"Telegram user",

player

);



}









// запуск


document.addEventListener(

"DOMContentLoaded",

()=>{


initTelegram();


});






window.initTelegram = initTelegram;
