const profileData = {

    name: localStorage.getItem("telegram_name") || "Игрок",

    id: localStorage.getItem("telegram_id") || "000000",

    balance: Number(localStorage.getItem("balance")) || 0,

    invited: Number(localStorage.getItem("invited")) || 0

};




function showProfile(){


    const profileBox =
    document.querySelector("#more .card");



    if(!profileBox) return;



    let old =
    document.querySelector(".profile-info");



    if(old) old.remove();



    let block = document.createElement("div");


    block.className="profile-info";



    block.innerHTML = `

    <div class="avatar big">
    ${profileData.name[0].toUpperCase()}
    </div>


    <h3>
    ${profileData.name}
    </h3>


    <p>
    ID: ${profileData.id}
    </p>


    <p>
    Баланс: ${profileData.balance.toFixed(2)} U
    </p>


    <p>
    Приглашено: ${profileData.invited}
    </p>


    `;



    profileBox.prepend(block);


}



showProfile();
