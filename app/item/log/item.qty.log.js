const mongoose = require( 'mongoose' ) ;

const QtySchema = new mongoose.Schema({
    Old : { type : Number, required : true, },
    New : { type : Number, required : true, },
}, { _id : false } ) ;

const itemLogSchema = new mongoose.Schema ({
    /*
    Type : values
    add : add,
    pur : purchase,
    sal : sell,
    exp : expired,
    def : defect,
    upd : update,
    */
   Type   : { type:String, index: true, },
   Item   : { type : String, index : true },
   Qty    : { type: QtySchema, required: true,},
   // RefID is only for sale and purchase ( will hold only one ID -> [ PurchaseID, SaleID ])
   RefID  : { type : mongoose.Schema.Types.ObjectId, index : true },
});

const ItemLog = mongoose.model( 'item_qty_logs', itemLogSchema ) ;
module.exports = ItemLog;
