const demoPlayers = [

    {
        name:"Александр",
        avatar:"A",
        balance:25000,
        invited:12
    },

    {
        name:"Максим",
        avatar:"M",
        balance:18000,
        invited:8
    },

    {
        name:"Евгений",
        avatar:"E",
        balance:12000,
        invited:5
    }

];





function loadTopPlayers(){


    const container =
    document.querySelector(".players");



    if(!container) return;



    container.innerHTML = "";



    demoPlayers.forEach((player,index)=>{


        let position = index + 1;



        container.innerHTML += `

        <div class="player">


            <div class="place">
            ${position}
            </div>


            <div class="avatar">
            ${player.avatar}
            </div>



            <div class="player-info">


            <b>
            ${player.name}
            </b>


            <p>
            Баланс: ${player.balance} U
            </p>


            <p>
            Приглашено: ${player.invited}
            </p>


            </div>



        </div>

        `;



    });



}



loadTopPlayers();
