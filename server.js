const express = require("express");
const mongoose = require("mongoose");
app = express();

//Connect to database
mongoose.connect('mongodb+srv://admin:admin@test-5s8sm.mongodb.net/IssuesProject?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true });

//Project Schema
const projectSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    creationDate: Date
});

//ProjectModel
const Project = mongoose.model("Projects", projectSchema, "Projects");

//Middlewares
app.use(express.static("public"));
app.use(express.json())

//GET projects
app.get("/projects", (req, res) => {
    Project.find().then(projects => {
        console.log(projects)
        res.json(projects)
    })
})

//POST projects
app.post("/projects", (req, res) => {
    let newProject = req.body;
    newProject.creationDate = new Date();
    Project.create(newProject).then(result => {
        res.json(result)
    }).catch(err => {
        res.status(500).json(err)
    })
})

//Initialize Server
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
