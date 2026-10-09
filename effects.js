// ===================================
// URALcoin EFFECTS v16.4
// Static Screen
// Snow Only
// No Fire
// ===================================



let clickSnowTimer = null;




// ===============================
// CLICK VISUAL EFFECT
// ===============================


function registerClickEffect(){


const heart = document.getElementById(
"heartPower"
);



if(heart){

heart.innerText="🫀";

}



}



// ===============================
// CLICK NUMBER
// ===============================


function createClickEffect(value){


let el = document.createElement(
"div"
);



el.className="click-number";



el.innerText =

"+" +

Number(value)

.toFixed(3);





el.style.left =

(35 + Math.random()*30) + "%";





el.style.top =

"60%";





document.body.appendChild(el);







setTimeout(()=>{


el.remove();


},700);




}









// ===============================
// RESET EFFECTS
// ===============================


function resetFireMode(){



const zone = document.getElementById(
"fireZone"
);



const snow = document.querySelector(
".snow"
);



if(zone){


zone.classList.remove(
"fire-mode"
);


}





if(snow){


snow.style.opacity="1";


}



}









window.registerClickEffect = registerClickEffect;

window.createClickEffect = createClickEffect;

window.resetFireMode = resetFireMode;
