// ===================================
// URALcoin EFFECTS v1
// Clean Click Effects
// ===================================



// ===============================
// Анимация +U
// ===============================


function showCoinEffect(value){


const text = document.createElement(
"div"
);



text.className =
"click-number";



text.innerText =

"+" +

Number(value)
.toFixed(3)
.replace(".",",")

+

" U";





document.body.appendChild(text);





setTimeout(()=>{


text.remove();



},800);



}






// ===============================
// Подсветка кнопки
// ===============================


function pulseClickButton(){



const button =

document.getElementById(
"clickButton"
);




if(!button)

return;






button.classList.remove(
"pulse"
);



void button.offsetWidth;



button.classList.add(
"pulse"
);






setTimeout(()=>{


button.classList.remove(
"pulse"
);



},300);



}








// ===============================
// Добавление эффекта
// ===============================


window.ClickEffects = {


show(value){


showCoinEffect(value);


pulseClickButton();


}



};
