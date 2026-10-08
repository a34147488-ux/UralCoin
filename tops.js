const demoUsers = [


{
name:"Ural Boss",
balance:125000,
friends:25,
avatar:""
},


{
name:"Екатеринбург",
balance:87000,
friends:18,
avatar:""
},


{
name:"Crypto U",
balance:54000,
friends:12,
avatar:""
},


{
name:"Player",
balance:23000,
friends:5,
avatar:""
}


];









function loadTop(){



const box =
document.getElementById(
"topList"
);




if(!box)
return;





box.innerHTML = "";






demoUsers
.sort(
(a,b)=>
b.balance-a.balance
)
.forEach(
(user,index)=>{





let item =
document.createElement(
"div"
);



item.className =
"top-player";





let photo =
user.avatar
?
`<img class="top-avatar" src="${user.avatar}">`
:
`
<div class="top-avatar">
${index+1}
</div>
`;






item.innerHTML = `


${photo}


<div>


<b>
#${index+1} ${user.name}
</b>


<br>


<span>
${user.balance.toFixed(2)} U
</span>


<br>


<span>
Приглашено:
${user.friends}
</span>



</div>


`;





box.appendChild(
item
);




}
);



}









loadTop();
