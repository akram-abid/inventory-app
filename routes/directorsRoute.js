const { Router } = require('express');
const directorsRoute = Router();
const directorController = require('../controllers/directorsController')

directorsRoute.get("/:id", directorController.displayDirector);

module.exports = directorsRoute;