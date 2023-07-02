const Router = require('express');
const router = new Router();
const cliController = require('../controller/cli.controller');
const countryController = require('../controller/countryDist.controller');
const linkController = require("../controller/linkCli.controller");

//CLIENTS ROUTE
router.post('/client', cliController.createClient);
router.get('/clients', cliController.getClients);
router.get('/client/:id', cliController.getOneClient);
router.put('/client', cliController.updateClient);
router.delete('/client/:id', cliController.deleteClient);


//COUNTRY DIST ROUTE
router.post('/country', countryController.createCountryDist);
router.get('/countries', countryController.getCountryDist);
router.get('/country/:id', countryController.getOneCountryDist);
router.put('/country', countryController.updateCountryDist);
router.delete('/country/:id', countryController.deleteCountryDist);


//LINK CONTROLLER ROUTE
router.post('/link', linkController.createLink);
router.get('/links/allTravels', linkController.getUserByLink)
router.get('/links', linkController.getAllLinks);
router.get('/link/:id', linkController.getOneLink);
router.put('/link', linkController.updateLink);
router.delete('/link/:id', linkController.deleteLink);



module.exports = router;



