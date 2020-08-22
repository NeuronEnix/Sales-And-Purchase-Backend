const { NON_ADMIN_URL, NO_TOKEN_REQUIRED_URL } = require( '../server.config' ).CONFIG.ACCESSIBLE_URL ;
const respond = require( '../response.js' ) ;
const errData = respond.errData ;


module.exports.authorize = async( req, res, next ) => {
 
    // return next() ; // -deb
    
    // If user is not admin
    if ( req.UserType !== "a" ) {
        // console.log( 'doooo')
        let url = req.url ;
        
        // Remove query parameter from the url
        const splitIndex = url.indexOf( "?" ) ;
        if ( splitIndex != -1 ) url = url.substring( 0, splitIndex ) ;

        // Check if url is accessible by non admin user or if token is not required; else throw error;
        if ( NON_ADMIN_URL.has( url ) || NO_TOKEN_REQUIRED_URL.has( url ) )  return next();// -Pop
        else throw { err: errData.unAuthorized } ;
    }
    return next() ;


}

