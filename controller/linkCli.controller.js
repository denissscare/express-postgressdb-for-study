const db = require("../db");
class LinkCliController{
    async createLink(req, res){}
    async getAllLinks(req, res){
        const links = await db.query(`SELECT * FROM cli_dist`);
        res.json(links.rows);
    }
    async getOneLink(req,res){
        const id = req.params.id;
        const link = await  db.query(`SELECT * FROM cli_dist WHERE id=$1`, [id]);
        res.json(link.rows[0]);
    }
    async getUserByLink(req,res){
        const link = await db.query(`SELECT cli_dist.id AS "ID поездки",cli.id AS "ID клиента",cli.first_name AS "Имя",cli.last_name AS "Фамилия",cli.address AS "Адресс",cli.email AS "Почта",cli.coutry AS "Cтрана проживания",ctry_dist.coutry AS "Страна назначения",cli_dist.days AS "Срок поездки",cli_dist.purpose AS "Цель назначения",cli_dist.days * ctry_dist.daily_price + ctry_dist.ticket_price + ctry_dist.visa_price AS "Сумма поездки" FROM cli_dist JOIN cli ON cli.id = cli_dist.cli_id JOIN ctry_dist ON ctry_dist.id = cli_dist.arrival_id;`);
        res.json(link.rows);
    }
    async updateLink(req,res){}
    async deleteLink(req,res){
        const id = req.params.id;
        const link = await db.query(`DELETE FROM cli_dist WHERE id=$1`, [id]);
        res.json(link.rows[0]);
    }
}

module.exports = new LinkCliController();