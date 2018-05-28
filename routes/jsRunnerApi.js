const express = require('express');
const router = express.Router();

var JavascriptTask = require('../models/JavascriptTask.js');


const jsRunnerApi = {
  getAll: (req, res, next) => {
    JavascriptTask.find(function(err, tasks) {
      if (err){
        res.json({
          success: false,
          tasks: []
        });
        return;      
      }

      // res.json(tasks);
      res.json({
        success: true,
        tasks: tasks
      });        
    });
  },
  getAllTitles: (req, res, next) => {
    JavascriptTask.find(function(err, tasks) {
      if (err){
        res.json({
          success: false,
          titles: []
        });      
      }
      
      // res.json(tasks);
      res.json({
        success: true,
        titles: jsRunnerApi.getTitlesFromTasks(tasks)
      });  
    });
  },
  createTask: (req, res, next) => {
    console.log(req.body)

    if (!req.body.task)
      res.send('Error! No task.')

    let task =  JSON.parse(req.body.task)
    var new_task = new JavascriptTask(task);
    // new_task.inputs = req.body.inputs || {}
    // new_task.markModified('inputs')
    // new_task.markModified('outputs')

    console.log(new_task)
    new_task.save(function(err, task) {
      if (err){
        res.send(err);
        return;
      }

      res.json(task);
    });
  },
  updateTask: (req, res, next) => {
    let taskObj =  JSON.parse(req.body.task)
    JavascriptTask.findOneAndUpdate({_id: req.params.taskId}, taskObj, {new: true}, function(err, task) {
      if (err){
        res.send(err);
        return;
      }
      res.json(task);
    });
  },
  getTask: (req, res, next) => {
    JavascriptTask.findById(req.params.taskId, function(err, task) {
      if (err){
        res.send(err);
        return;
      }
      res.json(task);
    });
  },
  deleteTask: (req, res, next) => {
    JavascriptTask.remove({_id: req.params.taskId}, function(err, task) {
      if (err){
        res.send(err);
        return;
      }
      res.json({ message: 'Task successfully deleted' });
    });
  },
  getTitlesFromTasks: (tasks) => {
    return tasks.map(t => {
      console.log(t)
      let title = t.title || "" 
      console.log(t['title'])
      return title
    })
  }

}

/* GET home page. */
router.get('/', jsRunnerApi.getAll );
router.get('/titles', jsRunnerApi.getAllTitles );

router.post('/task',jsRunnerApi.createTask);

// router.post('/tasks/:taskId', jsRunnerApi.updateTask)
router.get('/task/:taskId', jsRunnerApi.getTask)
// router.put('/task/:taskId', jsRunnerApi.updateTask)
router.post('/task/:taskId', jsRunnerApi.updateTask)
router.delete('/task/:taskId', jsRunnerApi.deleteTask)


module.exports = router;
