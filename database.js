// =====================================
// URALcoin DATABASE v1
// SQLite
// =====================================


const sqlite3 = require("sqlite3").verbose();

const path = require("path");





const db = new sqlite3.Database(

path.join(
__dirname,
"uralcoin.db"
)

);








// =====================================
// CREATE TABLES
// =====================================


function initDatabase(){





db.run(`

CREATE TABLE IF NOT EXISTS players (

id TEXT PRIMARY KEY,

username TEXT,

first_name TEXT,

avatar TEXT,

balance INTEGER DEFAULT 0,

click_power REAL DEFAULT 0.01,

second_power INTEGER DEFAULT 0,

promo_code TEXT,

referrer TEXT,

friends INTEGER DEFAULT 0,

earned_from_promo INTEGER DEFAULT 0,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)

`);









db.run(`

CREATE TABLE IF NOT EXISTS transfers (

id INTEGER PRIMARY KEY AUTOINCREMENT,

from_id TEXT,

to_username TEXT,

amount INTEGER,

date DATETIME DEFAULT CURRENT_TIMESTAMP

)

`);









db.run(`

CREATE TABLE IF NOT EXISTS roulette_history (

id INTEGER PRIMARY KEY AUTOINCREMENT,

number INTEGER,

color TEXT,

date DATETIME DEFAULT CURRENT_TIMESTAMP

)

`);








console.log(

"Database ready"

);



}









// =====================================
// GET PLAYER
// =====================================


function getPlayer(id,callback){



db.get(

`

SELECT *

FROM players

WHERE id=?

`,

[id],


callback



);



}









// =====================================
// CREATE PLAYER
// =====================================


function createPlayer(data,callback){



db.run(

`

INSERT OR IGNORE INTO players

(

id,

username,

first_name,

avatar,

promo_code,

referrer

)

VALUES

(?,?,?,?,?,?)

`,

[


data.id,


data.username,


data.first_name,


data.avatar,


"U"+data.id,

data.ref || null


],


callback



);



}









// =====================================
// UPDATE PLAYER
// =====================================


function updatePlayer(id,data){



db.run(

`

UPDATE players SET

balance=?,

click_power=?,

second_power=?

WHERE id=?

`,

[


data.balance,


data.click_power,


data.second_power,


id


]

);



}








module.exports = {


db,

initDatabase,

getPlayer,

createPlayer,

updatePlayer


};
