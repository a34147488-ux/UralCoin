// ===================================
// URALcoin EFFECTS v12
// Heart + Fire + Snow Control
// ===================================


let clickSpeed = [];

let fireTimer = null;







function registerClickEffect(){


const now = Date.now();



clickSpeed.push(now);





clickSpeed = clickSpeed.filter(

time => now - time < 2000

);





const heart = document.getElementById(
"heartPower"
);



const zone = document.getElementById(
"fireZone"
);



const snow = document.querySelector(
".snow"
);







// обычный режим


if(clickSpeed.length < 5){



if(heart){

heart.innerText="🫀";

}



if(zone){

zone.classList.remove(
"fire-mode"
);

}



if(snow){

snow.style.opacity="1";

}



return;


}







// быстрый режим


if(clickSpeed.length >=5 && clickSpeed.length <12){



if(heart){

heart.innerText="❤️";

}



if(zone){

zone.classList.remove(
"fire-mode"
);

}



}





// очень быстрый режим


if(clickSpeed.length >=12){



if(heart){

heart.innerText="🔥";

}



if(zone){

zone.classList.add(
"fire-mode"
);

}



if(snow){


snow.style.transition=".8s";

snow.style.opacity="0";


}





clearTimeout(fireTimer);



fireTimer=setTimeout(()=>{


resetFireMode();


},4000);



}



}









function resetFireMode(){



const heart = document.getElementById(
"heartPower"
);



const zone = document.getElementById(
"fireZone"
);



const snow = document.querySelector(
".snow"
);






if(heart){

heart.innerText="🫀";

}





if(zone){

zone.classList.remove(
"fire-mode"
);

}





if(snow){

snow.style.opacity="1";

}



clickSpeed=[];



}












// подключение к кнопке


document.addEventListener(

"DOMContentLoaded",

()=>{



const button = document.getElementById(
"clickButton"
);





if(button){



button.addEventListener(

"click",

()=>{


registerClickEffect();



}

);



}



}

);
