// ===================================
// URALcoin UPGRADE SYSTEM v12
// PURGANIS + PURLES + VLADIKAZ
// ===================================



const upgrades = [


{
id:"purganis",
name:"PURGANIS",
price:5000,
power:0.005
},


{
id:"purles",
name:"PURLES",
price:15000,
power:0.010
},


{
id:"vladestok",
name:"VLADESTOK",
price:50000,
power:0.025
},


{
id:"purpur",
name:"PURPUR",
price:150000,
power:0.050
},


{
id:"purus",
name:"PURUS",
price:400000,
power:0.100
},


{
id:"vladet",
name:"VLADET",
price:1000000,
power:0.250
},


{
id:"vladikaz",
name:"VLADIKAZ",
price:5000000,
power:1
}



];









function loadUpgrades(){



const box =

document.getElementById(
"upgradeList"
);





if(!box)

return;





let player = Storage.getPlayer();





box.innerHTML="";






upgrades.forEach(up=>{





let level =

player.upgrades?.[up.id] || 0;





let currentPrice =

Math.floor(

up.price *

Math.pow(

1.8,

level

)

);







const card =

document.createElement(
"div"
);





card.className =
"upgrade-card";







card.innerHTML = `



<div>


<b>

${up.name}

</b>


<br>


<span>

Уровень:

${level}

</span>



<br>



<span>

+

${up.power}

 U/клик

</span>



</div>





<button

data-id="${up.id}"

>

${

currentPrice.toLocaleString()

}

 U

</button>



`;









const button =

card.querySelector(
"button"
);







button.onclick = ()=>{


buyUpgrade(
up.id
);

};



box.appendChild(card);



});




}









function buyUpgrade(id){



let player =

Storage.getPlayer();






if(!player.upgrades)

player.upgrades={};







const up =

upgrades.find(

x=>x.id===id

);







let level =

player.upgrades[id] || 0;







let price =

Math.floor(

up.price *

Math.pow(

1.8,

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






player.clickPower +=

Number(up.power);







player.upgrades[id]=

level+1;







Storage.savePlayer(
player
);






loadUpgrades();





if(typeof updateScreen === "function"){


updateScreen();


}






}









document.addEventListener(

"DOMContentLoaded",

()=>{


loadUpgrades();


});
