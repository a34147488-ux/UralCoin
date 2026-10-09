// =====================================
// URALcoin DATABASE
// SQLite
// =====================================


import sqlite3 from "sqlite3";

import { open } from "sqlite";





let db;





export async function initDatabase(){



db = await open({

filename:"uralcoin.db",

driver:sqlite3.Database

});





// USERS

await db.exec(`

CREATE TABLE IF NOT EXISTS users (

id TEXT PRIMARY KEY,

username TEXT DEFAULT '',

first_name TEXT DEFAULT '',

avatar TEXT DEFAULT '',


balance INTEGER DEFAULT 0,


click_power REAL DEFAULT 0.01,


second_power INTEGER DEFAULT 0,



promo_code TEXT UNIQUE,


invited_by TEXT DEFAULT '',


friends INTEGER DEFAULT 0,


earned_from_promo INTEGER DEFAULT 0,



api_key TEXT DEFAULT '',



created INTEGER

);

`);







// PROMO ACTIVATIONS


await db.exec(`

CREATE TABLE IF NOT EXISTS promo_history (


id INTEGER PRIMARY KEY AUTOINCREMENT,


user_id TEXT,


promo TEXT,


reward INTEGER,


date INTEGER


);

`);







// TRANSFERS


await db.exec(`

CREATE TABLE IF NOT EXISTS transfers (


id INTEGER PRIMARY KEY AUTOINCREMENT,


from_id TEXT,


to_id TEXT,


amount INTEGER,


date INTEGER


);

`);







// ROULETTE BETS


await db.exec(`

CREATE TABLE IF NOT EXISTS roulette_bets (


id INTEGER PRIMARY KEY AUTOINCREMENT,


user_id TEXT,


amount INTEGER,


type TEXT,


round INTEGER,


date INTEGER


);

`);








// ROULETTE HISTORY


await db.exec(`

CREATE TABLE IF NOT EXISTS roulette_history (


id INTEGER PRIMARY KEY AUTOINCREMENT,


number INTEGER,


color TEXT,


date INTEGER


);

`);







// UPGRADES


await db.exec(`

CREATE TABLE IF NOT EXISTS upgrades (


id INTEGER PRIMARY KEY AUTOINCREMENT,


user_id TEXT,


level INTEGER DEFAULT 0


);

`);







console.log("DATABASE READY");



}









export function getDB(){


return db;


}
