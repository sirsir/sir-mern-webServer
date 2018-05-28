var axios = require('axios');

const MemosController = {
  urls: {
    search:'/memosApi/items/search/',
    searchByTag:'/memosApi/items/searchByTag/',
    summary:'/memosApi/summary',
    update: '/memosApi/items/',
    create: '/memosApi/item',
    delete: '/memosApi/items/',
  },
  update: memo => {
    let url = MemosController.urls.update + memo._id

    return new Promise(function(resolve, reject){
      axios.post(url, {item:memo})
      .then(
        resp => {        
          // console.log(resp)
          resolve(resp.data);
        }
      )
      .catch(
        e => reject(e)
      )
    })
  },
  delete: memo => {
    let url = MemosController.urls.delete + memo._id

    return new Promise(function(resolve, reject){
      axios.delete(url, {item:memo})
      .then(
        resp => {        
          // console.log(resp)
          resolve(resp.data);
        }
      )
      .catch(
        e => reject(e)
      )
    })
  },
  create: memo => {
    let url = MemosController.urls.create

    return new Promise(function(resolve, reject){
      axios.post(url, {item:memo})
      .then(
        resp => {        
          // console.log(resp)
          resolve(resp.data);
        }
      )
      .catch(
        e => reject(e)
      )
    })
  },
  search: keyword => {
    let url = MemosController.urls.search+encodeURI(keyword).replace(/#/g,'%23')

    return new Promise(function(resolve, reject){
      axios.get(url)
      .then(
        resp => {        
          // console.log(resp)
          resolve(resp.data);
        }
      )
      .catch(
        e => reject(e)
      )
    })
  },
  searchByTag: tag => {
    let url = MemosController.urls.searchByTag+encodeURI(tag).replace(/#/g,'%23')

    return new Promise(function(resolve, reject){
      axios.get(url)
      .then(
        resp => {        
          // console.log(resp)
          resolve(resp.data);
        }
      )
      .catch(
        e => reject(e)
      )
    })
  },
  getSummary: () => {
    let url= MemosController.urls.summary

    return new Promise(function(resolve, reject){
      axios.get(url)
      .then(
        resp => {        
          // console.log(resp)
          resolve(resp.data);
        }
      )
      .catch(
        e => reject(e)
      )
    })
  },
}
    

export default MemosController