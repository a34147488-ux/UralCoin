const Storage = {





getUser(){


let user =
JSON.parse(
localStorage.getItem("user")
);



if(!user){


user={


id:
localStorage.getItem("user_id")
|| "guest",


name:
"Игрок",


avatar:
"",


balance:0,


clickPower:0.01,


friends:0,


history:[]


};



this.saveUser(user);


}



return user;



},







saveUser(user){


localStorage.setItem(
"user",
JSON.stringify(user)
);


},







updateBalance(value){


let user =
this.getUser();



user.balance =
value;



this.saveUser(user);



},








addFriend(){


let user =
this.getUser();



user.friends++;



this.saveUser(user);



},








addHistory(item){


let user =
this.getUser();



user.history.push(item);



this.saveUser(user);



},








getHistory(){


let user =
this.getUser();



return user.history;



},







generateApi(){



let key =
"UC-"
+
Math.random()
.toString(36)
.substring(2,12)
.toUpperCase();




localStorage.setItem(
"api_key",
key
);



return key;



}





};





window.Storage =
Storage;
