const mongoose = require( 'mongoose' ) ;

//Fixes all deprecation warnings
mongoose.set( 'useNewUrlParser'    , true  ) ;
mongoose.set( 'useFindAndModify'   , false ) ;
mongoose.set( 'useCreateIndex'     , true  ) ;
mongoose.set( 'useUnifiedTopology' , true  ) ;
mongoose.set( 'autoIndex'          , true  ) ;

// Importing schema 
require( './app/item/item.model.js'         ) ;
require( './app/user/user.model.js'         ) ;
require( './app/sale/sale.model.js'         ) ;
require( './app/seller/seller.model.js'     ) ;
require( './app/purchase/purchase.model.js' ) ;

// Connects to DB
module.exports.connect = () => {
    mongoose.connect( process.env.DB_URL) 
        .then  ( val => { console.log('Connected to DB')     ; } )
        .catch ( err => { console.log('Not Connected to DB') ; } ) ;
}
