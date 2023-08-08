// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model.js")
const Celebrity = require("../models/Celebrity.model.js")

// all your routes here

// GET => Pasamos solo la vista para crear peliculas
router.get("/create", (req, res, next) => {
    
    Celebrity.find()
    .then((allCelebrities) => {

        res.render("movies/new-movie.hbs", {
            allCelebrities
        });
        console.log("Pasamos la info de los actores")
    })
    .catch((error) => next(error))
});

// POST => Pasamos el formulario para que el cliente cree una pelicula
router.post("/create", async(req, res, next) => {
const { title, genre, plot, cast } = req.body
try {
    await Movie.create({ title, genre, plot, cast });
    res.redirect("/movies");
    // console.log("Pasamos el formulario para que el cliente cree una pelicula")
} catch (error) {
    res.redirect("/movies/create");
    next(error)
}
});



module.exports = router;