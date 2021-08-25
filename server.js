const {CONFIG} = require( './server.config' ) // Server configuration ;

const db = require( './connection.js' ) ;
db.connect() ;

const cors         = require( 'cors'                 ) ;
const express      = require( 'express'              ) ;
const cookieParser = require( 'cookie-parser'        ) ;
                     require( 'express-async-errors' ) ;

const App     = require( './app'              ) ;
const auth    = require( './middleware/auth'  ) ;
const token   = require( './middleware/token' ) ;
const respond = require( './response'         ) ;

const app = express() ;
const corsOptions = {
    origin: [ 'http://localhost:3000' ],
    credentials: true,

}

app.use( cookieParser(), cors( corsOptions ), express.json() ) ;
app.use( requestLogger, token.verifyToken, auth.authorize, App.router ) ;
app.use( respond.errHandler ) ;

const PORT = CONFIG.SERVER.PORT;
app.listen( PORT, () => { console.log( 'Listening on port ' + PORT ) } ) ;

let ID = 1;
function requestLogger ( req, res, next ) {
   console.log( '\n\n' ) ; // -Deb
   console.log( { ID : ID, URL : req.url, Method : req.method, Body : req.body, } ) ; // -deb
   res.ID = ID++ ;    res._TS = new Date() ; // -Deb
   return next();
}