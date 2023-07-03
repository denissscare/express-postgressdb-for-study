const db = require("../db");

async function ctry_insert(res,req){
    const cli = await db.query(`CALL ctry_dist_insert('Russai', 400, 3000, 20)`)
}

ctry_insert();