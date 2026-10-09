// =====================================
// URALcoin UPGRADE SYSTEM v1
// Cities + CHIP
// =====================================



const cityUpgrades = [



{
name:"EKATERINBURG",
price:1000,
power:0.50,
class:"city-ekaterinburg"
},



{
name:"ARTEMOVSKIY",
price:5000,
power:0.50,
class:"city-artemovskiy"
},



{
name:"REZH",
price:50000,
power:0.50,
class:"city-rezh"
},



{
name:"CHELYABINSK",
price:100000,
power:0.50,
class:"city-chelyabinsk"
},



{
name:"IRBIT",
price:500000,
power:0.50,
class:"city-irbit"
}



];









const chips=[


{

name:"CHIP",

price:1000000,

income:0.50

},



{

name:"CHIP 2",

price:500000,

income:0.25

},



{

name:"CHIP 3",

price:300000,

income:0.15

},



{

name:"CHIP 4",

price:100000,

income:0.10

}



];









// =====================================
// RENDER
// =====================================



function renderUpgrades(){



let cityBox =

document.getElementById(

"upgradeList"

);




let chipBox =

document.getElementById(

"chipList"

);






if(cityBox){



cityBox.innerHTML="";






cityUpgrades.forEach((item,index)=>{





let level =

Storage.getPlayer().cities?.[index] || 0;





let price =

item.price *

Math.pow(2,level);






let card =

document.createElement(

"div"

);





card.className =

"upgrade-card "

+

item.class;








card.innerHTML=`

<h2>

${item.name}

</h2>


<p>

Сила клика:

+${item.power.toFixed(2)}

</p>


<p>

Уровень:

${level}

</p>


<p>

Цена:

${price.toLocaleString()}

U

</p>



<button>

КУПИТЬ

</button>

`;







card.querySelector("button")

.onclick=()=>buyCity(index);







cityBox.appendChild(card);





});





}









if(chipBox){



chipBox.innerHTML="";







chips.forEach((item,index)=>{



let player=

Storage.getPlayer();






let level =

player.chips?.[index] || 0;






let card=

document.createElement(

"div"

);






card.className=

"chip-card";






let price=

item.price;








card.innerHTML=`

<h3>

⚡ ${item.name}

</h3>



<div class="chip-income">

+${item.income}

U / сек

</div>




<div>

Цена:

${price.toLocaleString()}

U

</div>



<button>

КУПИТЬ

</button>


`;







card.querySelector("button")

.onclick=()=>buyChip(index);







chipBox.appendChild(card);



});



}






}
// =====================================
// BUY CITY
// =====================================


function buyCity(index){



let player =

Storage.getPlayer();





if(!player.cities)

player.cities=[];







let level =

player.cities[index] || 0;







let price =

cityUpgrades[index].price *

Math.pow(2,level);








if(player.balance < price){



alert(

"Недостаточно U"

);



return;



}







player.balance -= price;







player.cities[index]=

level+1;








player.click_power =

Number(

player.click_power || 0.50

)

+

cityUpgrades[index].power;








Storage.savePlayer(

player

);







updateUI();


renderUpgrades();





}











// =====================================
// BUY CHIP
// =====================================



function buyChip(index){



let player =

Storage.getPlayer();






if(!player.chips)

player.chips=[];







let level =

player.chips[index] || 0;







let item=

chips[index];








if(player.balance < item.price){



alert(

"Недостаточно U"

);



return;



}








player.balance -= item.price;







player.chips[index]=

level+1;








player.income =

Number(

player.income || 0

)

+

item.income;







Storage.savePlayer(

player

);







updateUI();


renderUpgrades();



}









// =====================================
// AUTO INCOME
// =====================================



setInterval(()=>{





let player=

Storage.getPlayer();





if(!player)

return;








let income =

Number(

player.income || 0

);






if(income<=0)

return;







player.balance += income;







Storage.savePlayer(

player

);







if(typeof updateUI==="function")

updateUI();







},1000);









// =====================================
// START
// =====================================



document.addEventListener(

"DOMContentLoaded",

()=>{



setTimeout(()=>{


renderUpgrades();



},500);



});









window.renderUpgrades=

renderUpgrades;
