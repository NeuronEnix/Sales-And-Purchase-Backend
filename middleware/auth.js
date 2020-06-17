const jwt     = require( 'jsonwebtoken' ) ;
const respond = require( '../response.js' ) ;
const User    = require( '../app/user/user.model.js' ) ;
const ID = 1;
const auth = async( req, res, next ) => {
    console.log( '\n\n' )
    console.log( { url : req.url, req: req.body, ID : ID } ) ;
    res.ID = ID++ ;
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
