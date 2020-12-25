const jwt = require( "jsonwebtoken" );

const meta = {
    // param fields
    accTok: {
        key: String,
        expiresIn: String,
        onError: ( err ) => {}
    },
    refTok: {
        key: String,
        expiresIn: String,
        expectedRefreshIn: String,
        onError: ( err ) => {}
    },
    validateTok: ( accTokData = {}, refTokData = {} ) => {},
    onError : ( err ) => {}
}

function extractTok( req ) {
    if( meta.accTok ) const accTokData = verifyToken( req.header( 'Authorization' ), meta.accTok.key );
    if( meta.refTok ) const refTokData = verifyToken( req.cookies.refTok, meta.refTok.key );
}

function verifyToken( token, key ) { if( token ) return jwt.verify( token, key ); }

function verifyRefTokIfExist(  ) {
    
}


function TokenVerifier( req, res, next ) {
    
    try {
        
        // Token Extraction
        

        
    } catch ( err ) {
        return meta.onError( err );
    }
}

function Token( init = meta )
{
    // function TokenInit() Definition
    return TokenVerifier;
}