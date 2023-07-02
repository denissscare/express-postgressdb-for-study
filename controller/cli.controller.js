const db = require("../db");
class ClientController {
    async createClient(req, res) {
        const {first_name, last_name} = req.body;
        console.log(first_name, last_name);
        res.json('ok');
    }

    async getClients(req, res) {
        const clients = await db.query(`SELECT * FROM cli`);
        res.json(clients.rows);
    }

    async getOneClient(req, res) {
        const id = req.params.id;
        const client = await db.query(`SELECT * FROM cli WHERE id = $1`, [id]);
        res.json(client.rows[0]);
    }

    async updateClient(req, res) {

    }

    async deleteClient(req, res) {
        const id = req.params.id;
        const clients = await db.query(`DELETE FROM cli WHERE id = $1`, [id]);
        res.json(clients.rows[0]);
    }
}

module.exports = new ClientController();