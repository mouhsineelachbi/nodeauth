var mongoose = require('mongoose');

var authorShema = new mongoose.Schema({
    name: {
        type:String,
        required : true
    }
})

module.exports = mongoose.model('Author', authorShema);
