var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var JavascriptTaskSchema   = new Schema({
    "title": String,
    "inputs": Schema.Types.Mixed,
    "outputs": Schema.Types.Mixed,
    "code": String,
    "note": String
});

module.exports = mongoose.model('JavascriptTask', JavascriptTaskSchema, 'javascript_tasks');