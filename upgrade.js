// ===================================
// URALcoin UPGRADE v16
// Stable Upgrade System
// ===================================



const upgrades = [



{
name:"PURGANIS",
price:5000,
type:"click",
power:0.005
},



{
name:"PURLES",
price:25000,
type:"click",
power:0.010
},



{
name:"VLADESTOK",
price:100000,
type:"click",
power:0.020
},



{
name:"PURPUR",
price:300000,
type:"auto",
power:1
},



{
name:"PURUS",
price:750000,
type:"auto",
power:3
},



{
name:"VLADET",
price:1500000,
type:"click",
power:0.050
},



{
name:"VLADIKAZ",
price:3000000,
type:"auto",
power:10
}



];









function drawUpgrades(){



let list =

document.getElementById(

"upgradeList"

);






if(!list)

return;







let player = Storage.getPlayer();






if(!player.upgrades)

player.upgrades={};








list.innerHTML="";









upgrades.forEach((item,index)=>{





let level =

Number(

player.upgrades[index] || 0

);







let price =

item.price *

(level+1);








let card = document.createElement(

"div"

);






card.className="upgrade-card";







card.innerHTML =

`

<h3>

${item.name}

</h3>


<p>

Уровень:

<b>${level}</b>

</p>


<p>

Цена:

<b>

${price.toLocaleString()} U

</b>

</p>



<button

class="gold-button"

data-upgrade="${index}">

Купить

</button>

`;









list.appendChild(card);



});








document

.querySelectorAll(

"[data-upgrade]"

)

.forEach(button=>{



button.onclick=()=>{



buyUpgrade(

Number(

button.dataset.upgrade

)

);



};



});



}









function buyUpgrade(id){



let player = Storage.getPlayer();





let item = upgrades[id];







if(!item)

return;






let level =

Number(

player.upgrades[id] || 0

);






let price =

item.price *

(level+1);








if(

player.balance < price

){



alert(

"Недостаточно U"

);



return;



}









player.balance -= price;







player.upgrades[id]=

level+1;







if(item.type==="click"){



player.clickPower =

Number(

player.clickPower || 0.01

)

+

Number(

item.power

);



}









if(item.type==="auto"){



player.autoPower =

Number(

player.autoPower || 0

)

+

Number(

item.power

);



}









Storage.savePlayer(player);







if(typeof updateScreen==="function"){


updateScreen();


}







if(typeof syncBalance==="function"){


syncBalance();


}







drawUpgrades();






}









document.addEventListener(

"DOMContentLoaded",

()=>{


drawUpgrades();


});






window.drawUpgrades = drawUpgrades;
