const mongoose = require( 'mongoose' ) ;
const { model } = require('../../seller/seller.model');
const Item = require('../item.model');

const itemSchema = new mongoose.Schema({
    Name : { type : String, ref  : 'items', required : true },
    Qty  : { type : Number, required : true }
}, { _id : false } ) ;

const itemLogSchema = new mongoose.Schema ({
    UserID : { type : mongoose.Schema.Types.ObjectId, required : true, index : true },
    
    /*
    Type : values
    a : add,
    p : purchase,
    s : sell,
    e : expired,
    d : defect,
    r : rollback,
    u : update,
    */
    Type   : { type : String },
    Item  : { type : [ itemSchema ], index : true },
    Undo   : Boolean, 

});

itemLogSchema.statics.Log = ( logData ) => {
    const itemLog = new ItemLog() ;
    Object.assign( itemLog, logData ) ;
    itemLog.save()
        .catch( err => {
            console.log( err ) ;
        })
}


const ItemLog = mongoose.model( 'item_qty_logs', itemLogSchema ) ;
module.exports = ItemLog;
