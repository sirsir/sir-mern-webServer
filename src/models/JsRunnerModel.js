import { observable, computed, action } from "mobx";

// import TodoModel from "./TodoModel";

export default class JsRunnerModel {
  @observable tasks = [];
  @observable taskSelectedId = 0;

  @computed
  get titles() {
    return this.tasks.map(task => {
      return {
        title: task.title,
        _id: task._id
      }
    }).sort((a,b) => {
      return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    });
  }

  @computed
  get task() {
    // console.log(this.taskSelectedId?this.tasks[this.taskSelectedId]:'')
    return this.taskSelectedId?this.tasks[this.taskSelectedId]:null
  }

  @action
  selectTask(_id) {
    this.taskSelectedId = this.tasks.findIndex(t=>{
      return t._id == _id
    })
  }

  @action
  addTask(task) {
    this.tasks.push(task);
  }

  @action
  removeTask(taskId) {
    this.tasks=this.tasks.filter(task => {
      return task._id != taskId;
    });
  }

  @action
  replaceTask(taskNew) {
    this.tasks=this.tasks.map(task => {
      if (task._id == taskNew._id){
        return taskNew
      }else{
        return task
      }
    });
  }

  // @action
  addTasks(tasks) {
    tasks.forEach(task => {
      this.addTask(task)
    })
  }
}
