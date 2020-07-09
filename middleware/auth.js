const jwt     = require( 'jsonwebtoken' ) ;
const respond = require( '../response.js' ) ;
const User    = require( '../app/user/user.model.js' ) ;
let ID = 1;
const auth = async( req, res, next ) => {
    try {
        console.log( '\n\n' ) ;
        console.log( { ID : ID, URL : req.url, Method : req.method, Body : req.body, } ) ;
        res.ID = ID++ ;    res.TS = Date.now() ;
        
        // console.log( req.ip )
        if ( toString( req.method ) == 'OPTIONS' ) return respond.ok( res ) ;

        const token = req.header( 'Authorization' ) ;
        const _id = jwt.verify( token, process.env.JWT_KEY ) ;

        const user = await User.findOne( { _id: _id } ) ;

        if ( !user ) throw { err : respond.errData.invalidToken } ;

        req.user = user ;
        return next();
    } catch ( err ) {
        // req.user = { _id : '5efc760f743081588775c454' } ; return next();
        if ( req.url === '/user/login' ) return next() ;
        
        else if ( err.name === 'JsonWebTokenError' )
            return respond.err( res, { err : respond.errData.invalidToken } )

        else return respond.err( res, err ) ;
    }
}

module.exports = auth;