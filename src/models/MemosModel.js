import { observable, computed, action, toJS } from "mobx";

import MemosController from "../controllers/MemosController"
// import TodoModel from "./TodoModel";




export default class MemosModel {
  @observable memos = [];
  //  memosExtension = {};
  @observable memosExtension = [];
  @observable titles = [];
  @observable memoSelectedId = 0;
  @observable keyword4search = "";

  @observable isEditing = false;
  @observable editingMemo = {}

  @observable tags2count = {}
  @observable totalTags = 0

  @observable isShowing_tagsList = false
  // @observable sortBy = "-time"
  @observable sortBy = ""

  // @computed
  // get titles() {
  //   // return this.memos.map(memo => {
  //   //   return {
  //   //     title: memo.title,
  //   //     _id: memo._id
  //   //   }
  //   // }).sort((a,b) => {
  //   //   return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
  //   // });
  //   return this.titles;
  // }

  @computed
  get memo() {    
    return this.memoSelectedId?this.memos[this.memoSelectedId]:null
  }

  @action
  getMemosExtension(_id){
    return this.memosExtension.find(m=>{return m._id == _id})
  }

  @computed
  get isMemoChanged(){
    let memo = this.memoById(this.editingMemo._id)
    // console.log(memo)

    return ! this.isSameMemo(toJS(memo), toJS(this.editingMemo) )
  }

  @action
  isSameMemo(memo1,memo2){
    try{
      let k1 = Object.keys(memo1).sort()
      let k2 = Object.keys(memo2).sort()

      /* Check number of keys */
      // if (JSON.stringify(k1) != JSON.stringify(k2)){
      //   console.log("number of key not equal")
      //   return false
      // }
      let isSame = true;

      k1.every(k=>{
        if (['title','tags','detail','links'].indexOf(k) == -1){
          return true
        }
        if (Array.isArray(memo1[k])){
          if (JSON.stringify(memo1[k].sort()) != JSON.stringify(memo2[k].sort())){
            console.log("key not equal:"+k)
            // console.log(JSON.stringify(memo1[k].sort()))
            // console.log(JSON.stringify(memo2[k].sort()))
            isSame = false
            return false;
          }
        }else{
          // console.log('string')
          if (memo1[k] != memo2[k]){
            console.log("key not equal:"+k)
            isSame = false
            return false;
          }
        }
        return true
        
      })
      return isSame;
    }catch(e){
      console.log("catch error: "+e.toString())
      return false
    }
    

  }

  // @action
  // selectById(_id) {
  //   this.memoSelectedId = this.memos.findIndex(t=>{
  //     return t._id == _id
  //   })
  // }

  @action
  memoById(_id) {
    let memo = this.memos.find(t=>{
      return t._id == _id
    })

    return memo
  } 

  @action
  update_storeMemos(memoNew, _id){
    this.memos.forEach((m,idx)=>{
      if (m._id == _id){
        // console.log(idx)
        this.memos[idx] = memoNew
      }
    })
  } 

  @action
  delete_storeMemos( _id){
    this.memos = this.memos.filter((m)=>{
      return _id != m._id      
    })
  } 

  
  @action
  CRUD_update(){
    let _this = this
    return new Promise(function(resolve, reject){

      MemosController.update(_this.editingMemo)
      .then(
        resp => { 
          let itemReturn = resp

          // let memoOld = _this.memoById(itemReturn._id) 
          // memoOld = itemReturn
          _this.update_storeMemos(itemReturn,itemReturn._id)

          resolve(itemReturn);
        }
      )
      .catch(
        e => reject(e)
      )
    })
  }

  @action
  CRUD_delete(){
    let _this = this
    return new Promise(function(resolve, reject){

      MemosController.delete(_this.editingMemo)
      .then(
        resp => { 
          let itemReturn = _this.editingMemo
          // let title = itemReturn.title
          _this.delete_storeMemos(itemReturn._id)

          resolve(itemReturn);
        }
      )
      .catch(
        e => reject(e)
      )
    })
  }

  @action
  CRUD_create(){
    let _this = this
    return new Promise(function(resolve, reject){

      MemosController.create(_this.editingMemo)
      .then(
        resp => { 
          // let itemReturn = resp

          // let memoOld = _this.memoById(itemReturn._id) 
          // memoOld = itemReturn
          _this.add(resp)

          resolve(resp);
        }
      )
      .catch(
        e => reject(e)
      )
    })
  }

  @action
  add(memo) {
    // console.log(memo)
    // this.memosExt.push(memo);
    this.memos.push(memo);

    let ext = {
      _id: memo._id,
      editMode: false,
      collapse: true
    }

    // this.memosExtension[memo._id]=ext;
    // this.memosExtension.push({...ext,...memo})
    this.memosExtension.push(ext)
    // this.memosExtension.push()

    // console.log(this.memosExt)
  }

  @action
  startEditItem(_id) {
    this.isEditing = true
    this.editingMemo = this.clone_memo(_id)
  }

  clone_memo(_id){
    let memo = this.memos.find(t=>{
      return t._id == _id
    })

    return JSON.parse(JSON.stringify(memo))
  }

  @action
  search() {
    this.sortBy = ""
    // this.memos.push(memo);
    if(this.keyword4search.indexOf('tag:') != -1){
      let tag = this.keyword4search.match(/tag:(.*)$/i)[1]
      this.searchByTag(tag) 
      return;
    }
    MemosController.search(this.keyword4search)
    .then(
      memos => {
        this.memos = []
        this.memosExtension = []
        this.addMany(memos)

        localStorage.setItem('keyword4search',this.keyword4search)
      }
    )
    .catch(function (error) {
      console.log('axios: error cant get search result from API')
    });
  }

  @action
  searchByTag(tag) {
    // this.memos.push(memo);
    this.keyword4search = 'tag:'+tag
    MemosController.searchByTag(tag)
    .then(
      memos => {
        this.memos = []
        this.memosExtension = []
        this.addMany(memos)


        localStorage.setItem('keyword4search',this.keyword4search)
      }
    )
    .catch(function (error) {
      console.log(`axios: error cant get ${url2search}`)
    });
  }

  @action
  toggleCollapseExpand(_id) {
    this.memosExtension = this.memosExtension.map(ext=>{
      if (ext._id == _id){
        ext.collapse = ! ext.collapse
      }
      return ext
    })
  }

  @action
  toggleEditMode(memoId) {
    this.memosExtension[memoId].editMode = ! this.memosExtension[memoId].editMode
  }

  @action
  remove(memoId) {
    this.memos=this.memos.filter(memo => {
      return memo._id != memoId;
    });
  }

  @action
  replace(memoNew) {
    this.memos=this.memos.map(memo => {
      if (memo._id == memoNew._id){
        return memoNew
      }else{
        return memo
      }
    });
  }

  @action
  sortMemos(sortBy) {
    console.log(sortBy)
    console.log(this.sortBy)

    if (this.sortBy == sortBy){
      this.sortBy = ""
    }else{
      this.sortBy = sortBy
    }

    this.memos = this.memos.sort(function(m1,m2){
      if (sortBy === 'title'){
        let c1 = m1.title
        let c2 = m2.title
        return c1.localeCompare(c2)
      } else if (sortBy === '-title'){
        let c1 = m1.title
        let c2 = m2.title
        return c2.localeCompare(c1)
      } else if (sortBy === 'time'){
        // log(thisReact.state.items[id1].id.getTimestamp())
        let c1 = m1.updated_at || m1.timestamp || new Date(Date.UTC(0))
        let c2 = m2.updated_at || m2.timestamp || new Date(Date.UTC(0))
        // return c1 > c2
        return new Date(c1).getTime() - new Date(c2).getTime()
      } else if (sortBy === '-time'){
        let c1 = m1.updated_at || m1.timestamp || new Date(Date.UTC(0))
        let c2 = m2.updated_at || m2.timestamp || new Date(Date.UTC(0))
        return new Date(c2).getTime() - new Date(c1).getTime()
      } else{
        return m1._searched_order - m2._searched_order        
      }
    })
  

    

  }

  @action
  addTitles(titles) {
    this.titles = titles;
    this.titles.sort((a,b) => {
      return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    })
  }

  @action
  addMany(memos) {
    memos.forEach((memo,i) => {
      memo._searched_order = i
      this.add(memo)
    })

    this.sortMemos(this.sortBy)
  }

}
