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
        res.status(200).send("Project deleted.")
    })
    .catch(error => {
        res.status(500).send("An error occurred.")
    })
})

//actions
router.post('/:id/actions', validateProjectId, (req, res) => {
    const action = Actions.insert(req.body)
    .then(response => {
        res.status(200).send(response)
    })
    .catch(error => {
        console.log(error)
        res.status(500).send(error)
    })
})

//get all project's actions based on project id
router.get('/:id/actions', validateProjectId, (req, res) => {
    const actions = Projects.getProjectActions(req.params.id)
    .then(response => {
        res.status(200).send(response)
    })
    .catch(error => {
        res.status(500).send("An error occurred.")
    })
})

//get single action based on action's id
router.get('/:id/actions/:actionid', validateProjectId, (req, res) => {
    const actions = Actions.get(req.params.actionid)
    .then(response => {
        res.status(200).send(response)
    })
    .catch(error => {
        res.status(500).send("An error occurred.")
    })
})


router.put('/:id/actions/:actionid', validateProjectId, (req, res) => {
    const updatedAction = Actions.update(req.params.actionid, req.body)
    .then(response => {
        res.status(200).send(response)
    })
    .catch(error => {
        res.status(500).send(error)
    })
})

router.delete('/:id/actions/:actionid', validateProjectId, (req, res) => {
    const deletedAction = Actions.remove(req.params.actionid)
    .then(response => {
        res.status(200).send(response)
    })
    .catch(error => {
        res.status(500).send(error)
    })
})


//middleware
function validateProjectId (req, res, next) {
    Projects.get(req.body.project_id || req.params.id)
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