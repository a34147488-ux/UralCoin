// =================================
// URALcoin UPGRADE v13.3
// =================================


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






let player =
Storage.getPlayer();





if(!player.upgrades){

player.upgrades=[];

Storage.savePlayer(player);

}





list.innerHTML="";







upgrades.forEach((item,index)=>{



let level =

player.upgrades[index] || 0;





let price =

item.price *

(level+1);






let div =

document.createElement(
"div"
);



div.className =
"upgrade-card";





div.innerHTML = `


<h3>

${item.name}

</h3>


<p>

Уровень:
<b>${level}</b>

</p>


<p>

Цена:
<b>${price.toLocaleString()} U</b>

</p>


<button 

class="gold-button upgrade-buy"

data-id="${index}">

Купить

</button>


`;





list.appendChild(div);



});









document

.querySelectorAll(".upgrade-buy")

.forEach(button=>{



button.onclick=function(){



buyUpgrade(

Number(
this.dataset.id
)

);



};



});



}









function buyUpgrade(id){



let player =

Storage.getPlayer();





let item =

upgrades[id];





let level =

player.upgrades[id] || 0;





let price =

item.price *

(level+1);








if(player.balance < price){



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

Number(player.clickPower)

+

Number(item.power);



}






if(item.type==="auto"){



player.autoPower =

Number(player.autoPower)

+

Number(item.power);



}







Storage.savePlayer(player);






updateScreen();



drawUpgrades();





}








window.drawUpgrades = drawUpgrades;
