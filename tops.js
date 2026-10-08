function loadTop(){


const box =
document.querySelector(".players");


if(!box) return;



box.innerHTML = `


<div class="player">

<div class="place">
1
</div>


<div class="avatar">
U
</div>


<div>

<b>
Игрок
</b>


<br>

0.00 U


<br>

<small>
Приглашено: 0
</small>


</div>


</div>


`;



}


loadTop();
