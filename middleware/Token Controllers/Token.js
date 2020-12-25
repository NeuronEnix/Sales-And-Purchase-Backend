const { func } = require("@hapi/joi");
const jwt = require( "jsonwebtoken" ); 

NO_TOKEN_NEEDED_URLS = new Set( [ '/user/sign-in', '/user/sign-out', '/token/acc-tok', '/token/ref-tok', ] );

const err = {
    tokenErr      : 0,
    tokenExp      : 1,
    tokenNotFound : 2,
}
  
function create ( payload, key, expiresIn ) {
    return jwt.sign( payload, key, { expiresIn } ) ;
}

function verify  ( token, key )  {

    //if token is empty or undefined
    if( !token ) throw this.err.tokenNotFound;

    try {
        return jwt.verify( token, key );
    } catch ( e ) {
        if ( e.name === "JsonWebTokenError" ) throw err.tokenErr
        if ( e.name === 'TokenExpiredError'   ) throw err.tokenExp ;
        throw e;
    }

}

module.exports.Token = { err, create, verify };
