// =================================
// URALcoin UPGRADE v13.2
// =================================


const upgrades = [


{
name:"PURGANIS",
price:5000,
type:"click",
value:0.005
},


{
name:"PURLES",
price:25000,
type:"click",
value:0.010
},


{
name:"VLADESTOK",
price:100000,
type:"click",
value:0.020
},


{
name:"PURPUR",
price:300000,
type:"auto",
value:2
},


{
name:"PURUS",
price:750000,
type:"auto",
value:5
},


{
name:"VLADET",
price:1500000,
type:"click",
value:0.050
},


{
name:"VLADIKAZ",
price:3000000,
type:"auto",
value:15
}



];








function drawUpgrades(){


let box =
document.getElementById("upgradeList");



if(!box)

return;





box.innerHTML="";




let player =
Storage.getPlayer();






upgrades.forEach((u,index)=>{



let level =
player.upgrades[index] || 0;





let currentPrice =

u.price *

(level+1);






box.innerHTML += `


<div class="upgrade-card">


<h3>${u.name}</h3>


<p>
Уровень: ${level}
</p>


<p>
Цена:
${currentPrice.toLocaleString()} U
</p>



<button 
class="gold-button upgrade-buy"
data-id="${index}">

Купить

</button>



</div>


`;



});






document
.querySelectorAll(".upgrade-buy")
.forEach(btn=>{



btn.onclick=function(){



buyUpgrade(
Number(this.dataset.id)
);



};



});



}









function buyUpgrade(id){



let player =
Storage.getPlayer();




let upgrade =
upgrades[id];





let level =
player.upgrades[id] || 0;






let price =
upgrade.price*(level+1);







if(player.balance < price){



alert(
"Недостаточно U"
);



return;



}







player.balance -= price;






player.upgrades[id]=level+1;







if(upgrade.type==="click"){



player.clickPower += upgrade.value;



}






if(upgrade.type==="auto"){



player.autoPower += upgrade.value;



}







Storage.savePlayer(player);







updateScreen();

drawUpgrades();







alert(
upgrade.name+" улучшен"
);



}






window.drawUpgrades=drawUpgrades;
