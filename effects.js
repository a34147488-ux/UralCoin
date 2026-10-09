// ===================================
// URALcoin EFFECTS v16.2
// Visual Effects Only
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








if(clickSpeed.length >=5 && clickSpeed.length <12){



if(heart)

heart.innerText="❤️";





return;


}









if(clickSpeed.length >=12){



if(heart)

heart.innerText="🔥";





if(zone)

zone.classList.add(

"fire-mode"

);






if(snow)

snow.style.opacity="0";







clearTimeout(fireTimer);






fireTimer=setTimeout(()=>{



resetFireMode();



},4000);




}



}









function resetFireMode(){



let heart = document.getElementById(

"heartPower"

);





let zone = document.getElementById(

"fireZone"

);





let snow = document.querySelector(

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









// ===============================
// CLICK NUMBER EFFECT
// ===============================


function createClickEffect(value){



let el=document.createElement(

"div"

);





el.className="click-number";





el.innerText=

"+"+

Number(value)

.toFixed(3);







el.style.left =

(20 + Math.random()*60)+"%";





el.style.top="65%";






document.body.appendChild(el);








setTimeout(()=>{


el.remove();


},700);





}









window.registerClickEffect = registerClickEffect;

window.resetFireMode = resetFireMode;

window.createClickEffect = createClickEffect;
