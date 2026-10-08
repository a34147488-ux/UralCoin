let transfers = JSON.parse(
    localStorage.getItem("transfers")
) || [];




const transferButton = 
document.querySelector("#transfer button");



if(transferButton){


transferButton.addEventListener("click",()=>{


    const inputs =
    document.querySelectorAll("#transfer input");


    const username = inputs[0].value.trim();

    const amount = Number(inputs[1].value);



    let balance =
    Number(localStorage.getItem("balance")) || 0;




    if(username === ""){

        alert("Введите получателя");
        return;

    }



    if(amount <= 0){

        alert("Введите сумму");
        return;

    }



    if(amount > balance){

        alert("Недостаточно U");
        return;

    }




    balance -= amount;


    localStorage.setItem(
        "balance",
        balance
    );



    let transfer = {

        user: username,

        amount: amount,

        date: new Date()
        .toLocaleString()

    };



    transfers.push(transfer);



    localStorage.setItem(
        "transfers",
        JSON.stringify(transfers)
    );



    alert(
        "Перевод выполнен"
    );



    inputs[0].value="";
    inputs[1].value="";



});


}
