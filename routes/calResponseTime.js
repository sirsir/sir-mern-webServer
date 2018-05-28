// import axios from 'axios';
var axios = require('axios');

var fs = require('fs');

var XLSX = require('xlsx')

var express = require('express');
var router = express.Router();

var Sugar = require('sugar');
Sugar.extend();

const remove_1st_last = 5
const remove_if_delay_greater_than = 3000

const url4elas = 'http://192.168.1.52:9200/as_voice_logs/voice_log/_search/?q=start_time:["2018-04-01 00:00:00"+TO+"2018-07-01 23:59:59"]&size=10000'
// const url4elas = 'http://192.168.1.52:9200/as_voice_logs/voice_log/_search/?size=1000&pretty=1'

var calResponseTimeObj={
  _x_getVoicelog: function(){
    console.log('sssssss')
    // axios.get('http://192.168.1.52:9200/as_voice_logs/voice_log/_search/?size=1000&pretty=1')
    // var res = axios.get('http://192.168.1.52:9200/as_voice_logs/voice_log/_search/?size=10000&pretty=1');
    var res = axios.get(url4elas);
    console.log('sssssss')
    console.log(res)

    // axios.get('http://192.168.1.52:9200/as_voice_logs/voice_log/_search/?size=1000&pretty=1')
    //   .then(res => {
    //     console.log('sssssss')
    //     console.log(res)
    //     return JSON.stringify(res.data)
    //     // const posts = res.data.data.children.map(obj => obj.data);
    //     // this.setState({ posts });
    //   });
  },
  calAverageDelay: function(voicelogs){
    let delaysAgent = []
    let callSummaries = []
    let callDetails = []
    voicelogs.forEach(function(vl){
      let callSummary = {}
      let eachcallDelays = []

      console.log(`===== voice_log = ${vl._id}`)
      if (! vl._source){
        return;
      }

      if (! vl._source.recognition_results){
        return;
      }

      vlSorted = vl._source.recognition_results
      vlSorted.sort(function(a,b){
        return a.start_msec - b.start_msec
      })

      vlSorted.forEach(function(v,vIdx){
        let vlPrevious = vlSorted[vIdx-1]

        if (vIdx < remove_1st_last){
          return;
        }

        if (vIdx > vlSorted.length-remove_1st_last){
          return;
        }

        if (v.channel==0 & vlPrevious.channel==1){
          let delay = v.start_msec - vlPrevious.end_msec          

          // if (delay > 1000 ){
            console.log(`=== delay= ${delay}`)
            console.log(`Customer: ${vlPrevious.result} (${vlPrevious.start_msec}-${vlPrevious.end_msec})`)
            console.log(`Agent: ${v.result} (${v.start_msec}-${v.end_msec})`)
          // }

          if (delay > remove_if_delay_greater_than ){
            return
          }

          if (delay > 0 ){
            delaysAgent.push(delay)
            eachcallDelays.push(delay)           
          }
          
        }      

      })

      callSummary.id = vl._id
      callSummary.average = eachcallDelays.average()
      callSummary.max = eachcallDelays.max()
      callSummary.min = eachcallDelays.min()

      // callDetails.push([vl._id].concat(eachcallDelays) )
      callDetails = callDetails.concat(eachcallDelays)

      callSummaries.push(callSummary)

    })

    callDetails = callDetails.map(function(x){return [x]})

    calResponseTimeObj.createXlsxFromJson(
      {
        allCallAgentDelay: delaysAgent,
        callSummaries: callSummaries,
        callDetails: callDetails
      }
    )

    

    return [delaysAgent,callDetails]
  },

  createXlsxFromJson: function(json){
    console.log("createXlsxFromJson()")
    console.log(json)

    let wb = XLSX.utils.book_new();
    // let ws = XLSX.utils.json_to_sheet([{a:1,b:2},{a:1,b:20},{a:1,b:21},{a:1,b:22}])
    let ws = XLSX.utils.json_to_sheet(json.callSummaries)
    XLSX.utils.book_append_sheet(wb, ws, 'Each calls');

    
    let ws2_data = [
      [ "Total Calls:", json.callSummaries.length ],
      [ "Average Agent Response:", json.allCallAgentDelay.average() ],
      [""],
      [""],
      ["=== SETTING ==="],
      [ "Exclude 1st,last:", remove_1st_last ],
      [ "Exclude delay greather than", remove_if_delay_greater_than ],
    ];
    let ws2 = XLSX.utils.aoa_to_sheet(ws2_data);
    XLSX.utils.book_append_sheet(wb, ws2, 'Summary');

    let ws3 = XLSX.utils.aoa_to_sheet(json.callDetails);
    XLSX.utils.book_append_sheet(wb, ws3, 'Details');


    XLSX.writeFile(wb, './routes/data/output/test.xlsx');
  },

  getResponseDelay: function(resVL){
    console.log('getResponseDelay()')
    console.log(resVL.data.hits.hits)
    let voicelogs = resVL.data.hits.hits

    let [delaysAgent, callDetails] = calResponseTimeObj.calAverageDelay(voicelogs)

    return [delaysAgent.average(), callDetails]

  },
  getResponseDelayOffline: function(){
    console.log('getResponseDelayOffline()')
    // console.log(resVL.data.hits.hits)
    
    // let voicelogs = resVL.data.hits.hits

    let voicelogs = JSON.parse(fs.readFileSync('./routes/data/mock/voicelog_from_elas.json', 'utf8'));

    voicelogs = voicelogs.hits.hits
    // console.log(voicelogs)


    let [delaysAgent, callDetails]= calResponseTimeObj.calAverageDelay(voicelogs)

    return [delaysAgent.average(), callDetails]

  }
}



/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('sssssss')
  axios.get(url4elas,{timeout:1000000})
  .then(
    resVL => {
      let [avg,callDetails] = calResponseTimeObj.getResponseDelay(resVL)

      res.render(
        'calResponseTime', 
        { 
          title: 'Calculate Response Time' ,
          // voicelogs: JSON.stringify({a:1,b:22})
          voicelogs: 'Average response delay:' + avg,
          callDetails: JSON.stringify(callDetails)
        }
      );
    }
  ).catch(function (error) {
    console.log(`axios: cant get => use offline file`)
    let [avg,callDetails] = calResponseTimeObj.getResponseDelayOffline()

    res.render(
      'calResponseTime', 
      { 
        title: 'Calculate Response Time (OFFLINE)' ,
        // voicelogs: JSON.stringify({a:1,b:22})
        voicelogs: 'Average response delay:' + avg,
        callDetails: JSON.stringify(callDetails),
        serverStatus: req.serverStatus
      }
    )
  });
  
});

module.exports = router;
