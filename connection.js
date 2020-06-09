const mongoose = require( 'mongoose' ) ;

//Fixes all deprecation warnings
mongoose.set( 'useNewUrlParser'    , true  ) ;
mongoose.set( 'useFindAndModify'   , false ) ;
mongoose.set( 'useCreateIndex'     , true  ) ;
mongoose.set( 'useUnifiedTopology' , true  ) ;

// Connects to DB
module.exports.connect = () => {
    mongoose.connect( process.env.DB_URL) 
        .then  ( val => { console.log('Connected to DB')     ; } )
        .catch ( err => { console.log('Not Connected to DB') ; } ) ;
}

