const tg = window.Telegram.WebApp;


tg.ready();

tg.expand();



const user = tg.initDataUnsafe?.user;



if(user){


    localStorage.setItem(
        "telegram_id",
        user.id
    );


    localStorage.setItem(
        "telegram_name",
        user.first_name || "Игрок"
    );



    if(user.photo_url){

        localStorage.setItem(
            "avatar",
            user.photo_url
        );

    }



    console.log(user);


}
