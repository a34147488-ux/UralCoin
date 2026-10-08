let promos =

JSON.parse(

localStorage.getItem(
"promos"
)

)

||
[];







// СОЗДАНИЕ ПРОМОКОДА



const createPromo =
document.getElementById(
"createPromo"
);






if(createPromo){



createPromo.onclick = ()=>{



const name =
document.getElementById(
"promoName"
)
.value
.trim()
.toUpperCase();




const reward =
Number(
document.getElementById(
"promoReward"
)
.value
);




const limit =
Number(
document.getElementById(
"promoLimit"
)
.value
);






if(!name){


alert(
"Введите название промокода"
);


return;


}





if(!reward || reward <=0){


alert(
"Введите награду"
);


return;


}







if(!limit || limit <=0){


alert(
"Введите лимит"
);


return;


}








let player =
Storage.getPlayer();







const promo = {


code:name,


reward:reward,


limit:limit,


used:[],


owner:
player.id



};







promos.push(
promo
);






localStorage.setItem(

"promos",

JSON.stringify(promos)

);







alert(

"Промокод создан: "
+
name

);






document.getElementById(
"promoName"
).value="";



document.getElementById(
"promoReward"
).value="";



document.getElementById(
"promoLimit"
).value="";





};




}









// АКТИВАЦИЯ ПРОМОКОДА



const usePromo =
document.getElementById(
"usePromo"
);






if(usePromo){



usePromo.onclick = ()=>{



const input =
document.getElementById(
"promoInput"
);



const code =
input.value
.trim()
.toUpperCase();






if(!code){


alert(
"Введите промокод"
);


return;


}







let promo =

promos.find(

p=>
p.code===code

);






if(!promo){



alert(
"Промокод не найден"
);



return;


}








let player =
Storage.getPlayer();







if(
promo.used.includes(
player.id
)

){



alert(
"Вы уже использовали этот промокод"
);



return;


}








if(
promo.used.length >= promo.limit

){



alert(
"Лимит промокода закончился"
);



return;


}








player.balance +=
promo.reward;



promo.used.push(
player.id
);







Storage.savePlayer(
player
);







localStorage.setItem(

"promos",

JSON.stringify(promos)

);






alert(

"Получено "
+
promo.reward
+
" U"

);







input.value="";




};




}
