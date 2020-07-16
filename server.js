require( 'dotenv' ).config() ; // Configures env vars ;
const cors         = require( 'cors' ) ;
const express      = require( 'express' ) ;
const cookieParser = require( 'cookie-parser' ) ;

const App     = require( './app' ) ;
const respond = require( './response.js' ) ;
const auth    = require( './middleware/auth.js' ) ;

const db = require( './connection.js' ) ;
db.connect() ;

const app = express() ;
const corsOptions = {
    origin: [ 'http://localhost:3000', 'http://192.168.225.4:3000' ],
    credentials: true,

}
app.use( cookieParser(), cors( corsOptions ), express.json(), auth.authorize, App.router ) ;
app.use(respond.errHandler);
PORT = process.env.SERVER_PORT ;
app.listen( PORT, () => { console.log( 'Listening on port ' + PORT ) } ) ;