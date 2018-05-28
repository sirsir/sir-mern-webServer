import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


// import TodoList from "./components/TodoList";
// import TodoListModel from "./models/TodoListModel";
// import TodoModel from "./models/TodoModel";

import JsRunnerModel from "./models/JsRunnerModel";

import JsRunnerSelect from "./components/jsRunner/JsRunnerSelect";
import JsRunnerData2Run from "./components/jsRunner/JsRunnerData2Run";
import JsRunnerCode2Run from "./components/jsRunner/JsRunnerCode2Run";

var axios = require('axios');

// const store = new TodoListModel();

const store4JsRunner = new JsRunnerModel();


// const url4jsRunner = 'http://192.168.1.52:9200/as_voice_logs/voice_log/_search/?q=start_time:["2018-04-01 00:00:00"+TO+"2018-07-01 23:59:59"]&size=10'
const url4jsRunner = '/jsRunnerApi'
// const url4jsRunner = 'http://192.168.1.52:9200/as_voice_logs/voice_log/_search/?size=10&pretty=1'

axios.get(url4jsRunner)
.then(function (response) {
  console.log('sssssss')
  console.log(response.data.tasks)
  store4JsRunner.addTasks(response.data.tasks)

  let previousSelectTaskId =  localStorage.getItem('selectedTaskId') || '5afbbb281bcaf433775f587d'
  store4JsRunner.selectTask(previousSelectTaskId)
  
})
.catch(function (error) {
  console.log(error);
});

// const jsRunner={
//   onClick_runButton: function(ev){
//     console.log("onClick_runButton")
//     jsRunner.runCurrentTask()
//   },
//   runCurrentTask: function(){
//     let editor = ace.edit("AceEditor-code");
//     let code = editor.getSession().getValue()
//     console.log(code)
//     eval(code)
//   }
// }

// // onClick={onClick_runButton}
// const onClick_runButton = function(ev){
//   console.log("onClick_runButton")
//   jsRunner.runCurrentTask()
// }
    

render(
  <div>
    <DevTools />    
    <JsRunnerSelect store={store4JsRunner}/>
    <button id="runButton" className="btn btn-default" type="button">
      <span className="glyphicon glyphicon-play-circle">RUN</span>
    </button>


    <Tabs forceRenderTabPanel="true">
    <TabList>
      <Tab>Function Runner</Tab>
      <Tab>Function Editor</Tab>
    </TabList>

    <TabPanel>
      <JsRunnerData2Run store={store4JsRunner}/>
    </TabPanel>
    <TabPanel>
      <JsRunnerCode2Run store={store4JsRunner}/>
    </TabPanel>
  </Tabs>

  </div>,
  document.getElementById("root")
);



// playing around in the console
window.store = store4JsRunner;
