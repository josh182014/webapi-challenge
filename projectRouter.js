const router = require('express').Router();
const Projects = require('./data/helpers/projectModel');
const Actions = require('./data/helpers/actionModel');

//CRUD Operations

//projects 
router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
    .then(response => {
        res.status(200).send("Success")
    })
    .catch(error => {
        res.status(500).send("An error occurred.")
    })

})

router.get('/:id', validateProjectId, (req, res) => {
    const projects = Projects.get(req.params.id)
    .then(projects => {
        res.status(200).send(projects)
    })
    .catch(error => {
        res.status(500).send(error)
    })
})

router.put('/:id', validateProjectId, (req, res) => {
    const updatedProject = Projects.update(req.params.id, req.body)
    .then(response => {
        res.status(200).send("Project updated.")
    })
    .catch(error => {
        res.status(500).send("An error occurred.")
    })
})

router.delete('/:id', validateProjectId, (req, res) => {
    const deletedProject = Projects.remove(req.params.id)
    .then(response => {
        res.status(200).send("User deleted.")
    })
    .catch(error => {
        res.status(500).send("An error occurred.")
    })
})

//middleware
function validateProjectId (req, res, next) {
    Projects.get(req.params.id)
    .then(project => {
        if (project) {
            next()
        }
        else {
            res.status(404).send({ message: "User not found" })
        }
    })
    .catch(err => {
        res.status(500).send({ message: "An error occurred on our end." })
    })
}

function validateProject (req, res, next) {
    function isEmpty(obj) {
        for(var key in obj) {
          if(obj.hasOwnProperty(key))
            return false;
            }
        return true;
    }
    if(!isEmpty(req.body)) {
        if (req.body.name && req.body.description) {
            next()
        }
        else if (!req.body.name) {
            res.status(400).send({message: "Missing required name."})
        }
        else if (!req.body.description) {
            res.status(400).send({message: "Missing required description."})
        }
    }
    else {
        res.status(400).send({message: "Missing all required data."})
    }
}



module.exports = router;