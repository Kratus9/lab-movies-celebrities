// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js")

// GET => Pasamos solo la vista para crear celebrities
router.get("/create", (req, res, next) => {
        res.render("celebrities/new-celebrity.hbs");
        // console.log("Pasamos solo la vista para crear celebrities")
});

// POST => Pasamos el formulario para que el cliente cree una celebrity
router.post("/create", async(req, res, next) => {
    const { name, occupation, catchPhrase } = req.body
    try {
        await Celebrity.create({ name, occupation, catchPhrase });
        res.redirect("/celebrities");
        // console.log("Pasamos el formulario para que el cliente cree una celebrity")
    } catch (error) {
        res.redirect("/celebrities/create");
        next(error)
    }
});

// GET => Pasamos solo la vista de la lista de celebrities
router.get("/", async (req, res, next) => {
    try {
        const allCelebrities = await Celebrity.find()
        res.render("celebrities/celebrities.hbs", { allCelebrities })
    } catch (error) {
        next(error)
    }
})


module.exports = router;