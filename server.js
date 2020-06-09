require( 'dotenv' ).config() ; // Configures env vars ;

const cors = require( 'cors' ) ;
const express = require( 'express' ) ;
const api = require( './api' ) ;
const bodyParser = require( 'body-parser' ) ;

// const auth = require( './middleware/auth.js' ) ;
const db = require( './connection.js' ) ;
db.connect() ;

const app = express() ;

// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded( { extended: false } ) )

// parse application/json
app.use( bodyParser.json() )

app.use( cors() ) ;
app.use( api.router ) ;

PORT = process.env.SERVER_PORT ;
app.listen( PORT, () => { console.log( 'Listening on port ' + PORT ) } ) ;