function loadTop(){


let box =
document.querySelector(".players");


if(!box) return;




let users =
JSON.parse(
localStorage.getItem("users")
) || [];




users.sort(
(a,b)=>b.balance-a.balance
);



box.innerHTML="";




users.slice(0,10)
.forEach((user,index)=>{



let avatar;



if(user.avatar){


avatar =
`
<img 
src="${user.avatar}"
class="top-avatar">
`;



}else{


avatar =
`
<div class="top-avatar">
${user.name[0]}
</div>
`;



}





box.innerHTML += `


<div class="player">


<div class="place">

${index+1}

</div>



${avatar}



<div>


<b>
${user.name}
</b>


<br>


<span>
${user.balance.toFixed(2)} U
</span>


<br>


<small>
Приглашено: ${user.invited}
</small>


</div>



</div>



`;





});



}




loadTop();
