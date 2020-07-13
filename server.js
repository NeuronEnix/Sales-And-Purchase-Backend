require( 'dotenv' ).config() ; // Configures env vars ;
require( './validation.js' ).config() ;

const cors = require( 'cors' ) ;
const express = require( 'express' ) ;
const cookieParser = require( 'cookie-parser' ) ;

const App = require( './app' ) ;
const auth = require( './middleware/auth.js' ) ;

const db = require( './connection.js' ) ;
db.connect() ;

const app = express() ;
const corsOptions = {
    origin: [ 'http://localhost:3000' ],
    credentials: true,

}
app.use( cookieParser(), cors( corsOptions ), express.json(), auth.authorize, App.router ) ;

PORT = process.env.SERVER_PORT ;
app.listen( PORT, () => { console.log( 'Listening on port ' + PORT ) } ) ;

// res start.cookie( 'access-token', token, {
//     maxAge : 2 * 24 * 60 * 60 * 100,
//     httpOnly: true,
// } )