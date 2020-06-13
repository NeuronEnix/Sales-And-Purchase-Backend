const mongoose = require( 'mongoose' ) ;

var itemSchema = new mongoose.Schema ({
    UserID : {
        type : mongoose.Schema.Types.ObjectId, required : true
    },
    Name : {
        type : String, unique : true, trim : true,
        required : true
    },
    Unit : {
        type : String, required : true
    },
    Qty : {
        type : Number, required : true
    }
});

const Item = mongoose.model( 'items', itemSchema ) ;
module.exports = Item;
