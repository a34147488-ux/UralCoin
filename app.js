// =====================================
// URALcoin APP FIXED v2
// Static Home + Click System
// =====================================


let player = null;



// =====================================
// LOAD PLAYER
// =====================================


function loadPlayer(){

    player = Storage.getPlayer();


    if(!player){
        return;
    }


    window.player = player;


    updateUI();

}




// =====================================
// UPDATE UI
// =====================================


function updateUI(){

    if(!player){
        return;
    }



    const balance =
    document.getElementById("balance");


    if(balance){

        balance.innerText =
        Math.floor(player.balance || 0);

    }




    const power =
    document.getElementById("clickPower");


    if(power){

        power.innerText =
        player.click_power || 0.01;

    }




    const income =
    document.getElementById("secondPower");


    if(income){

        income.innerText =
        player.second_power || 0;

    }



}




window.updateUI = updateUI;





// =====================================
// CLICK
// =====================================


function clickCoin(){


    if(!player){
        return;
    }



    let power =
    Number(player.click_power || 0.01);



    player.balance =
    Number(player.balance || 0)
    +
    power;



    Storage.savePlayer(player);



    updateUI();




    fetch(
        CONFIG.API_URL + "/click",
        {

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },


            body:JSON.stringify({

                id:String(player.id)

            })


        }
    )
    .catch(()=>{});



}





window.clickCoin = clickCoin;






// =====================================
// NAVIGATION
// =====================================


function initNavigation(){



    const buttons =
    document.querySelectorAll(".nav");



    const pages =
    document.querySelectorAll(".page");




    buttons.forEach(button=>{


        button.addEventListener(
            "click",
            ()=>{


                const target =
                button.dataset.page;




                pages.forEach(page=>{

                    page.classList.remove(
                        "active"
                    );

                });




                const open =
                document.getElementById(target);



                if(open){

                    open.classList.add(
                        "active"
                    );

                }




                buttons.forEach(btn=>{

                    btn.classList.remove(
                        "active"
                    );

                });



                button.classList.add(
                    "active"
                );



            }
        );


    });



}






// =====================================
// TELEGRAM READY START
// =====================================


document.addEventListener(
"DOMContentLoaded",
()=>{


    initNavigation();



    loadPlayer();




    const clickButton =
    document.getElementById(
        "clickButton"
    );




    if(clickButton){


        clickButton.addEventListener(
            "click",
            clickCoin
        );


    }



});
