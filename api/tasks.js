const express = require('express');
const router = express.Router();
const Tasks = require('../models/Tasks');

// @route GET /api/tasks
// @desc get tasks list
// @assess Public

router.get('/', (req, res) => {
    Tasks.find().then(items => res.json(items));
});

// @route GET /api/tasks/:id
// @desc get single task
// @assess Public

router.get('/:id', (req, res) => {
    Tasks.findById(req.params.id).then(items => res.json(items));
});


// @route POST /api/tasks
// @desc add task
// @assess Public

router.post('/', (req, res) => {
    const newItem = new Tasks({
        title: req.body.title,
        desc: req.body.desc
    });
    newItem.save().then(item => res.json(item));
});

// @route PUT /api/tasks/:id
// @desc update task
// @assess Public

router.put('/', (req, res) => {
    Tasks.findById(req.body._id)
        .then(item => {
            item.title = req.body.title;
            item.desc = req.body.desc;
            item.save()
                .then(() => res.json('Task Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        });
});


// @route DELETE /api/tasks/:id
// @desc delete task
// @assess Public

router.delete('/:id', (req, res) => {
    Tasks.findById(req.params.id).then(item => item.remove().then(() => res.json({ success: true }))).catch(err => res.status(404).json({ success: false }));
});

const deleteTask = (id) => {
    try{
        Tasks.findById(id).then(item => item.remove());
    } catch (error) {
        console.log("Ошибка удаления");
    }
}
//
router.ws('/delete', (ws, res) => {
    ws.on('message', function (id) {
        deleteTask(id);
        ws.send(id);
    });
});

module.exports = router;