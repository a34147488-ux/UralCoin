// UralCoin v2
// Система промокодов



let promos =

JSON.parse(

localStorage.getItem(
"ural_promos"
)

)

||
[];








function savePromos(){


localStorage.setItem(

"ural_promos",

JSON.stringify(promos)

);


}









// СОЗДАНИЕ ПРОМОКОДА



const createPromo =
document.getElementById(
"createPromo"
);





if(createPromo){



createPromo.onclick = ()=>{



const name =

document
.getElementById(
"promoName"
)
.value
.trim()
.toUpperCase();





const reward =

Number(

document
.getElementById(
"promoReward"
)
.value

);





const limit =

Number(

document
.getElementById(
"promoLimit"
)
.value

);








if(!name){


alert(
"Введите название"
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







let exists =

promos.find(

p=>
p.code === name

);







if(exists){



alert(
"Такой промокод уже существует"
);



return;


}









let player =
Storage.getPlayer();








promos.push({



code:
name,



reward:
reward,



limit:
limit,



used:[],



owner:
player.id



});








savePromos();







alert(

"Промокод создан: "
+
name

);








document
.getElementById(
"promoName"
)
.value="";



document
.getElementById(
"promoReward"
)
.value="";



document
.getElementById(
"promoLimit"
)
.value="";




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

document
.getElementById(
"promoInput"
);





const code =

input.value
.trim()
.toUpperCase();






if(!code){



alert(
"Введите код"
);



return;



}








let promo =

promos.find(

p=>
p.code === code

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
"Вы уже использовали этот код"
);



return;


}








if(
promo.used.length >= promo.limit

){



alert(
"Лимит закончился"
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







savePromos();







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
