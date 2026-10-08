// ===================================
// URALcoin UPGRADE SYSTEM v13
// PUR SERIES
// ===================================



const upgrades = [


{
id:"purganis",
name:"PURGANIS",
type:"click",
start:5000,
power:0.005
},



{
id:"purles",
name:"PURLES",
type:"click",
start:25000,
power:0.01
},



{
id:"vladestok",
name:"VLADESTOK",
type:"click",
start:75000,
power:0.025
},



{
id:"purpur",
name:"PURPUR",
type:"click",
start:200000,
power:0.05
},



{
id:"purus",
name:"PURUS",
type:"auto",
start:500000,
power:0.2
},



{
id:"vladet",
name:"VLADET",
type:"auto",
start:1000000,
power:0.5
},



{
id:"vladikaz",
name:"VLADIKAZ",
type:"auto",
start:2500000,
power:1
}


];









function drawUpgrades(){



const box =

document.getElementById(

"upgradeList"

);





if(!box)

return;







let player =

Storage.getPlayer();







box.innerHTML="";









upgrades.forEach(up=>{



let level =

player.upgrades[up.id] || 0;







let price =

Math.floor(

up.start *

Math.pow(

1.7,

level

)

);








let card =

document.createElement(

"div"

);





card.className=

"upgrade-card";







card.innerHTML=`

<div class="upgrade-name">

${up.name}

</div>


<div class="upgrade-level">

Уровень:

${level}

</div>



<div class="upgrade-price">

Цена:

${price.toLocaleString()}

U

</div>



<button

class="gold-button upgrade-buy"

data-id="${up.id}"

>

Купить

</button>

`;








box.appendChild(card);






});









document

.querySelectorAll(".upgrade-buy")

.forEach(btn=>{



btn.onclick=()=>{


buyUpgrade(

btn.dataset.id

);



};



});







}









function buyUpgrade(id){



let player =

Storage.getPlayer();






let up =

upgrades.find(

u=>u.id===id

);






if(!up)

return;







let level =

player.upgrades[id] || 0;






let price =

Math.floor(

up.start *

Math.pow(

1.7,

level

)

);








if(player.balance < price){



alert(

"Недостаточно U"

);



return;



}







player.balance -= price;








player.upgrades[id] =

level + 1;








if(up.type==="click"){



player.clickPower +=

up.power;



}







if(up.type==="auto"){



player.autoPower +=

up.power;



}







Storage.savePlayer(player);








drawUpgrades();







if(typeof updateScreen==="function"){



updateScreen();



}








if(typeof syncBalance==="function"){



syncBalance();



}



}









document.addEventListener(

"DOMContentLoaded",

()=>{



drawUpgrades();



});
