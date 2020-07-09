const mongoose = require( 'mongoose' ) ;

var itemLogSchema = new mongoose.Schema ({
    UserID : { type : mongoose.Schema.Types.ObjectId, required : true },
    
    /*
    Type : values
    'b' ( bill ),
    'p' ( purchase ),
    'd' ( defect ),
    'e' ( expired ),
    'u' ( item update ( rebalancing stocks ) ) ,
    */
    Type   : { type : String },
    
    BillID : { type : mongoose.Schema.Types.ObjectId, required : true },
    SaleID : { type : mongoose.Schema.Types.ObjectId, required : true },

});

const ItemLog = mongoose.model( 'item_logs', itemLogSchema ) ;
module.exports = ItemLog;
