const mongoose = require( 'mongoose' ) ;
const errData  = require('../../response').errData ;

let itemSchema = new mongoose.Schema({
    Name : { type : String, ref  : 'items', },
    Qty  : { type : Number, required : true, }
}, { _id : false } ) ;

let saleSchema = new mongoose.Schema ({
    Items : { 
        type : [ itemSchema ], required : true
    }
});

saleSchema.statics.Create = async ( items ) => {
    try {
        const sale = new Sale() ;
        sale.Items = items ;
        return await sale.save() ;
    } catch ( err ) {
        throw { err : errData.unknownErr } ;
    }
}

const Sale = mongoose.model( 'sales', saleSchema ) ;
module.exports = Sale;
