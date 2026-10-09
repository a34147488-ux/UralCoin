// ===================================
// URALcoin EFFECTS v16
// Visual Click Effects Only
// ===================================


let clickSpeed = [];

let fireTimer = null;






function registerClickEffect(){



const now = Date.now();





clickSpeed.push(now);






clickSpeed = clickSpeed.filter(

time => now - time < 2000

);






const heart =

document.getElementById(

"heartPower"

);






const zone =

document.getElementById(

"fireZone"

);






const snow =

document.querySelector(

".snow"

);









// обычный режим


if(clickSpeed.length < 5){



if(heart)

heart.innerText="🫀";



if(zone)

zone.classList.remove(

"fire-mode"

);



if(snow)

snow.style.opacity="1";



return;



}








// быстрый режим


if(clickSpeed.length >=5 && clickSpeed.length <12){



if(heart)

heart.innerText="❤️";



if(zone)

zone.classList.remove(

"fire-mode"

);



}









// максимальная скорость


if(clickSpeed.length >=12){



if(heart)

heart.innerText="🔥";





if(zone)

zone.classList.add(

"fire-mode"

);






if(snow){


snow.style.opacity="0";


}








clearTimeout(fireTimer);






fireTimer=setTimeout(()=>{


resetFireMode();



},4000);





}



}









function resetFireMode(){



const heart =

document.getElementById(

"heartPower"

);






const zone =

document.getElementById(

"fireZone"

);






const snow =

document.querySelector(

".snow"

);







if(heart)

heart.innerText="🫀";







if(zone)

zone.classList.remove(

"fire-mode"

);







if(snow)

snow.style.opacity="1";






clickSpeed=[];



}










// только подключение эффекта
// без привязки к кнопке


window.registerClickEffect = registerClickEffect;



window.resetFireMode = resetFireMode;
