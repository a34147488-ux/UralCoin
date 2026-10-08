function loadTop(){


const box = document.querySelector(".players");


if(!box) return;



let users = JSON.parse(
localStorage.getItem("users")
) || [];





/*
Тестовые игроки.
Потом заменим на данные Railway.
*/


if(users.length === 0){


users = [


{
name:"Александр",
balance:25000,
invited:12,
avatar:"A"
},


{
name:"Максим",
balance:18000,
invited:8,
avatar:"M"
},


{
name:"Евгений",
balance:12000,
invited:5,
avatar:"E"
}



];


}






users.sort(
(a,b)=> b.balance - a.balance
);





box.innerHTML = "";





users.slice(0,10).forEach((user,index)=>{



box.innerHTML += `



<div class="player-card">



<div class="rank">

${index + 1}

</div>





<div class="top-avatar">

${user.avatar || user.name[0]}

</div>





<div class="player-info">



<b>

${user.name}

</b>




<span>

${Number(user.balance).toFixed(2)} U

</span>




<small>

Приглашено: ${user.invited || 0}

</small>




</div>




</div>



`;



});



}




loadTop();
