const db = require("../db/queries")

exports.displayItems = async (req, res) => {
    const categories = await db.getAllCategories();
    const movies = await db.getAllMovies();
    res.render("movies", {title: "all the movies will be here", categories: categories, movies: movies})
};

exports.enterNewItem = async (req, res) => {
    const categories = await db.getAllCategories();
    res.render("movieForm", {title: "New Movie", categories: categories});
};

exports.storeNewMovie = async (req, res) => {
    const title = req.body.title;
    const desc = req.body.description;
    const releaseDate = req.body.reldate;
    const image = req.body.image;
    const categoryId = req.body.category;
    
    await db.storeNewMovie(title, releaseDate, desc, categoryId, image);
    
    res.redirect("/");
};;

exports.displayAMovie = (req, res) => {
    res.render("movie", {})
};  

exports.enterNewCategorie = async (req, res) => {
    const name = req.body.name;
    await db.storeNewCategorie(name);
    res.redirect("/");
};

exports.dispalyNewCategorie = (req, res) => {
    res.render("categorieForm", {});
};

exports.displaySingleMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        
        const movie = await db.getMovieById(movieId);
        
        if (!movie) {
            return res.status(404).render('404', { title: 'Movie Not Found' });
        }
        
        console.log(movie);

        const category = await db.getCategoryById(movie.category_id);
        
        res.render('movie', { 
            title: movie.name,
            movie: movie,
            category: category,
            description: movie.description
        });
    } catch (error) {
        console.error('Error displaying movie:', error);
        res.status(500).render('error', { 
            title: 'Server Error',
            message: 'Could not load movie details'
        });
    }
};