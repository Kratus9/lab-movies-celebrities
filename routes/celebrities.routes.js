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

// GET => Pasar vista de detalles celebrity
router.get("/:celebrityId", async(req, res, next) => {
    const { celebrityId } = req.params
    try {
        
        const celebrity = await Celebrity.findById(celebrityId)
        res.render("celebrities/celebrity-details.hbs", { celebrity })
    } catch (error) {
        next(error)
    }
})

// POST => Borrar celebrity
router.post("/:celebrityId/delete", async (req, res, next) => {
    const { celebrityId } = req.params
    try {
        
        await Celebrity.findByIdAndDelete(celebrityId)
        res.redirect("/celebrities")
    } catch (error) {
        next(error)
    }
})

// GET => Pasamos la vista del editor de celebrities
router.get("/:celebrityId/edit", async (req, res, next) => {
    const { celebrityId } = req.params
    try {
        
        const celebrity = await Celebrity.findById(celebrityId)
        res.render("celebrities/edit-celebrity.hbs", { celebrity })
    } catch (error) {
        next(error)
    }
})

// POST => Pasamos los cambios efectuados por el cliente sobre la celebrity
router.post("/:celebrityId/edit", async (req, res, next) => {
    const { celebrityId } = req.params
    const { name, occupation, catchPhrase } = req.body
    try {
        
        await Celebrity.findByIdAndUpdate(celebrityId, { name, occupation, catchPhrase })
        res.redirect(`/celebrities/${celebrityId}`)
    } catch (error) {
        next(error)
    }
})


module.exports = router;