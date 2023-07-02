const db = require("../db");

class CountryDistController{
    async createCountryDist(req,res){

    }
    async getCountryDist(req,res){
        const countryDist = await db.query(`SELECT * FROM ctry_dist`);
        res.json(countryDist.rows);
    }
    async getOneCountryDist(req,res){
        const id = req.params.id;
        const countryDist = await db.query(`SELECT * FROM ctry_dist WHERE id=$1`,[id]);
        res.json(countryDist.rows[0]);
    }
    async updateCountryDist(req,res){

    }
    async deleteCountryDist(req,res){
        const id = req.params.id;
        const countryDist = await db.query(`DELETE FROM ctry_dist WHERE id=$1`,[id]);
        res.json(countryDist.rows[0]);
    }
}

module.exports = new CountryDistController();
