const express = require('express');
const router = express.Router();

var Memo = require('../models/Memo.js');


const memosApi = {
  getAll: (req, res, next) => {
    Memo.find(function(err, items) {
      if (err){
        res.json({
          success: false,
          items: []
        });
        return;      
      }

      // res.json(tasks);
      res.json({
        success: true,
        items: items
      });        
    });
  },
  getAllTitles: (req, res, next) => {
    Memo.find(function(err, items) {
      if (err){
        res.json({
          success: false,
          titles: []
        });      
      }
      
      // res.json(items);
      res.json({
        success: true,
        titles: memosApi.getValueFromItemsKey(items,'title')
      });  
    });
  },
  getSummary: (req, res, next) => {
    Memo.find(function(err, items) {
      if (err){
        res.json({
          success: false,
          titles: []
        });      
      }
      
      // res.json(items);
      res.json({
        success: true,
        titles: memosApi.getValueFromItemsKey(items,'title'),
        tags: memosApi.getTagsFromItems(items)
      });  
    });
  },
  create: (req, res, next) => {

    if (!req.body.item)
      res.send('Error! No task.')

    // let itemParse =  JSON.parse(req.body.item)
    // var memo = new Memo(itemParse);

     // let itemParse =  JSON.parse(req.body.item)
     var memo = req.body.item
     delete memo._id
     delete memo.created_at
     delete memo.updated_at
    memo = new Memo(memo);

    

    console.log(memo)
    memo.save(function(err, item) {
      if (err){
        res.send(err);
        return;
      }

      res.json(item);
    });
  },
  update: (req, res, next) => {
    // let memo =  JSON.parse(req.body.item)
    let memo =  req.body.item
    delete memo.updated_at
    Memo.findOneAndUpdate({_id: req.params.itemId}, memo, {new: true}, function(err, item) {
      if (err){
        res.send(err);
        return;
      }
      res.json(item);
    });
  },
  search: (req, res, next) => {
    let keyword = req.params.keyword
    
    Memo.find({$text: {$search: keyword}}, function(err, item) {
      if (err){
        res.send(err);
        return;
      }
      res.json(item);
    });
  },
  searchByTag: (req, res, next) => {
    let tag = req.params.tag
    
    Memo.find({tags: tag}, function(err, item) {
      if (err){
        res.send(err);
        return;
      }
      res.json(item);
    });
  },
  get: (req, res, next) => {
    Memo.findById(req.params.itemId, function(err, item) {
      if (err){
        res.send(err);
        return;
      }
      res.json(item);
    });
  },
  delete: (req, res, next) => {
    Memo.remove({_id: req.params.itemId}, function(err) {
      if (err){
        res.send(err);
        return;
      }
      res.json({ message: 'Item successfully deleted' });
    });
  },
  getValueFromItemsKey: (items,key) => {
    if (! items){
      return null
    }

    return items.map(t => {
      console.log(t)
      //console.log(t['key'])
      let objOut = {}
      objOut[key] = t[key] || ""
      objOut._id = t._id || null 

      return objOut
    })
  },
  getTagsFromItems: (items,key) => {
    if (! items){
      return null
    }

    let tags = items.reduce(function(tags,item){
      tags = tags.concat(item.tags)
      return tags
    },[])

    let tags2count = tags.reduce(function (acc, tag) {
      if (typeof acc[tag] == 'undefined') {
        acc[tag] = 1;
      } else {
        acc[tag] += 1;
      }

      return acc;
    }, {});
     
    return { tags2count, total: tags.length}
  }

}

/* GET home page. */
router.get('/', memosApi.get );
router.get('/titles', memosApi.getAllTitles );
router.get('/summary', memosApi.getSummary)

router.post('/item',memosApi.create);

// router.post('/tasks/:itemId', memosApi.updateTask)
router.get('/items/:itemId', memosApi.get)
// router.put('/task/:itemId', memosApi.updateTask)
router.post('/items/:itemId', memosApi.update)
router.delete('/items/:itemId', memosApi.delete)

router.get('/items/search/:keyword', memosApi.search)
router.get('/items/searchByTag/:tag', memosApi.searchByTag)




module.exports = router;
