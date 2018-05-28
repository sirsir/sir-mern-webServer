import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import MemosModel from "./models/MemosModel";
import MemosController from "./controllers/MemosController"


import Select from "./components/memos/MemosTitlesSelect";
import SearchBox from "./components/memos/SearchBox";
import MemoItems from "./components/memos/MemoItems";
import Modal4EditMemo from "./components/memos/Modal4EditMemo";
import Toolbars from "./components/memos/Toolbars";
import TagsList from "./components/memos/TagsList"


import Modal from "./components/memos/Modal";
// import JsRunnerData2Run from "./components/JsRunnerData2Run";
// import JsRunnerCode2Run from "./components/JsRunnerCode2Run";

import './stylesheets/memos.scss';

var axios = require('axios');

// const store = new TodoListModel();

const store4memos = new MemosModel();


// const url4jsRunner = 'http://192.168.1.52:9200/as_voice_logs/voice_log/_search/?q=start_time:["2018-04-01 00:00:00"+TO+"2018-07-01 23:59:59"]&size=10'
// const url4titles = '/memosApi/titles'
const url4summary = '/memosApi/summary'
// const url4jsRunner = 'http://192.168.1.52:9200/as_voice_logs/voice_log/_search/?size=10&pretty=1'

axios.get(url4summary)
.then(function (response) {

  
  
})
.catch(function (error) {
  console.log(error);
});

MemosController.getSummary()
.then(
  respData => {

    console.log(respData)
    
    store4memos.addTitles(respData.titles)

    let previousSelectTaskId =  localStorage.getItem('selectedMemoId') || null

    if (previousSelectTaskId){
      store4memos.selectById(previousSelectTaskId)
    }

    /* Set tags related */
    store4memos.tags2count = respData.tags.tags2count
    store4memos.totalTags = respData.tags.total    
  }
).then(()=>{
  // LOAD LAST SEARCH
  let keyword4search = localStorage.getItem('keyword4search')
  if (keyword4search){
    store4memos.keyword4search = keyword4search
    store4memos.search()
  }
})
.catch(function (error) {
  console.log(`Error! Unable to get memos summary`)
});

    
  //   <Tabs forceRenderTabPanel="true">
  //   <TabList>
  //     <Tab>Memos</Tab>
  //     <Tab>Editor</Tab>
  //   </TabList>

  //   <TabPanel>
  //     {//<JsRunnerData2Run store={store4memos}/>}
  //   </TabPanel>
  //   <TabPanel>
  //     {//<JsRunnerCode2Run store={store4memos}/>}
  //   </TabPanel>
  // </Tabs>

    //   <button id="runButton" className="btn btn-default" type="button">
    //   <span className="glyphicon glyphicon-play-circle">RUN</span>
    // </button>  

    // <Modal
    //   id="MemoEdit"
    //   title="Edit Memo"
    //   body="HELLLLLLLO"
    //   buttonText="yoyoyo"
    //   store={store4memos}
    // /> 

render(
  <div>
    <DevTools />    
    <Select store={store4memos}/>
    <SearchBox store={store4memos}/>
    <Toolbars store={store4memos}/>
    <TagsList store={store4memos}/>
    <MemoItems store={store4memos}/>
    <Modal4EditMemo store={store4memos}/>
    

    

  </div>,
  document.getElementById("root")
);



// playing around in the console
window.store = store4memos;
