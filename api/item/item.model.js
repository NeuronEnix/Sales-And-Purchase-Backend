const mongoose = require( 'mongoose' ) ;
const { errData } = require('../../response');

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

itemSchema.statics.detail = async ( itemName ) => {
    if( itemName ){
        try{
            const item = await Item.find( { Name : itemName }, { _id : 0, __v : 0, UserID : 0 } ) ;
            console.log('item found') ;
            return item ;
        } catch( err ) {
            console.log('item fetch error') ;
            throw errData.itemFetchErr ;
        }
    }else{
        console.log( 'Item Name missing' ) ;
        throw errData.missingField ;
    }
}

const Item = mongoose.model( 'items', itemSchema ) ;
module.exports = Item;
