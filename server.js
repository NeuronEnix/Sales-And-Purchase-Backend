require( 'dotenv' ).config() ; // Configures env vars ;
require( './validation.js' ).config() ;

const cors = require( 'cors' ) ;
const express = require( 'express' ) ;
const bodyParser = require( 'body-parser' ) ;

const App = require( './app' ) ;
const auth = require( './middleware/auth.js' ) ;

const db = require( './connection.js' ) ;
db.connect() ;

const app = express() ;

// 1st arg : parse application/x-www-form-urlencoded
// 2nd arg : parse application/json
app.use( bodyParser.urlencoded( { extended: false } ), bodyParser.json() )

app.use( cors(), auth, App.router ) ;

PORT = process.env.SERVER_PORT ;
app.listen( PORT, () => { console.log( 'Listening on port ' + PORT ) } ) ;