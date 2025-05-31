const { Router } = require("express");
const moviesRoute = Router();
const moviesController = require('../controllers/moviesController')

moviesRoute.get("/", moviesController.displayItems);
moviesRoute.get("/movies", moviesController.displayAMovie);
moviesRoute.post("/new-movie", moviesController.storeNewMovie);
moviesRoute.get("/new-movie", moviesController.enterNewItem);
moviesRoute.post("/new-categorie", moviesController.enterNewCategorie);
moviesRoute.get("/new-categorie", moviesController.dispalyNewCategorie);
moviesRoute.get("/movies/:id", moviesController.displaySingleMovie);


module.exports = moviesRoute;