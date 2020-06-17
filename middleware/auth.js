const jwt     = require( 'jsonwebtoken' ) ;
const respond = require( '../response.js' ) ;
const User    = require( '../app/user/user.model.js' ) ;
let ID = 1;
const auth = async( req, res, next ) => {
    console.log( '\n\n' ) ;
    console.log( { ID : ID, URL : req.url, Method : req.method, Body : req.body, } ) ;
<<<<<<< HEAD
    res.ID = ID++ ;    res.TS = Date.now() ;
    if ( req.method === 'OPTIONS' ) return respond.ok( res ) ;
=======
    res.ID = ID++ ;
    // if ( req.method === 'OPTIONS' ) return respond.ok( res ) ;
>>>>>>> 1efc2a56fa5483c8ecf785098e38093daaea77f8
    try {
        const token = req.header( 'Authorization' ) ;
        const _id = jwt.verify( token, process.env.JWT_KEY ) ;
        const user = await User.findOne( { _id: _id } ) ;
        if ( !user ) {
            console.log( 'Invalid Token') ;
            throw new Error();
        }
        console.log( 'Token Verified' ) ;
        req.user = user ;
        return next();
    } catch ( err ) {
        if( req.url === '/user/login' ) {
            return next() ;
        }else{
            respond.err( res, respond.errData.invalidToken ) ;
        }
    }
}

module.exports = auth;
