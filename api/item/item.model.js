const mongoose = require( 'mongoose' ) ;

var itemSchema = new mongoose.Schema ({
    Name : {
        type : String,
        trim : true,
        required : true
    }
});

const Item = mongoose.model( 'items', itemSchema ) ;
module.exports = Item;