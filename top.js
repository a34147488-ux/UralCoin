// UralCoin TOP SYSTEM v3

function formatTopBalance(value){

    return Number(value || 0)
        .toLocaleString("ru-RU", {
            minimumFractionDigits:3,
            maximumFractionDigits:3
        });

}



function getCurrentPlayerForTop(){

    const player = Storage.getPlayer() || {};

    const tg =
    window.Telegram?.WebApp?.initDataUnsafe?.user;


    return {

        id:
        player.id ||
        tg?.id ||
        "guest",


        name:
        player.name ||
        tg?.first_name ||
        "Игрок",


        photo:
        player.photo ||
        tg?.photo_url ||
        "",


        balance:
        Number(player.balance || 0),


        friends:
        Number(player.friends || 0)

    };

}






function savePlayerToTop(){


    let players =
    JSON.parse(
        localStorage.getItem("ural_players")
    ) || [];



    const current =
    getCurrentPlayerForTop();



    const exists =
    players.findIndex(
        p=>String(p.id)===String(current.id)
    );



    if(exists >=0){

        players[exists]=current;

    }
    else{

        players.push(current);

    }



    localStorage.setItem(
        "ural_players",
        JSON.stringify(players)
    );

}







function renderTop(){


    const list =
    document.getElementById("topList");


    if(!list)
    return;



    savePlayerToTop();



    let players =
    JSON.parse(
        localStorage.getItem("ural_players")
    ) || [];



    players =
    players
    .sort(
        (a,b)=>
        Number(b.balance)-Number(a.balance)
    );



    list.innerHTML="";



    players
    .slice(0,20)
    .forEach(
        (player,index)=>{


        let avatar =
        "";



        if(player.photo){

            avatar = `
            <img 
            class="top-avatar-img"
            src="${player.photo}">
            `;

        }
        else{

            avatar = `
            <div class="top-avatar">
            ${player.name.charAt(0).toUpperCase()}
            </div>
            `;

        }





        const card =
        document.createElement("div");



        card.className="top-card";



        card.innerHTML=`

        <div class="top-place">
        ${index+1}
        </div>


        ${avatar}


        <div class="top-info">


        <div class="top-name">
        ${player.name}
        </div>


        <div class="top-balance">
        ${formatTopBalance(player.balance)}
        <span>U</span>
        </div>


        <div class="top-friends">
        Приглашено: ${player.friends}
        </div>


        </div>


        `;



        card.onclick=()=>{


            alert(
            "Игрок: "+player.name+
            "\nБаланс: "+
            formatTopBalance(player.balance)
            );


        };



        list.appendChild(card);



    });



}







document.addEventListener(
"DOMContentLoaded",
()=>{


renderTop();


setInterval(
renderTop,
5000
);


});
