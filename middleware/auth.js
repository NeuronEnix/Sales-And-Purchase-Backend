const jwt     = require( 'jsonwebtoken' ) ;
const respond = require( '../response.js' ) ;
const User    = require( '../app/user/user.model.js' ) ;
let ID = 1;
const auth = async( req, res, next ) => {
    try {
        console.log( '\n\n' ) ;
        console.log( { ID : ID, URL : req.url, Method : req.method, Body : req.body, } ) ;
        res.ID = ID++ ;    res.TS = Date.now() ;

        if ( toString( req.method ) == 'OPTIONS' ) return respond.ok( res ) ;

        const token = req.header( 'Authorization' ) ;
        const _id = jwt.verify( token, process.env.JWT_KEY ) ;

        const user = await User.findOne( { _id: _id } ) ;

        if ( !user ) throw { err : respond.errData.invalidToken } ;

        req.user = user ;
        return next();
    } catch ( err ) {

        if( req.url === '/user/login' ) return next() ;
        else return respond.err( res, err ) ;
    }
}

module.exports = auth;