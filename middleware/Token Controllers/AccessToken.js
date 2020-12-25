const { Token } = require( "./Token" );

const ACC_TOK_KEY = "yo";
const ACC_TOK_EXP = "2d";

function newToken ( payload ) {
    return Token.create( payload, ACC_TOK_KEY, ACC_TOK_EXP );
}

function verify( tokenString ) {
    try {
        return Token.verify( tokenString, ACC_TOK_KEY );
    } catch ( err ) {
        switch ( err ) {
            // Error Handling
            case Token.err.tokenErr: return ;
            case Token.err.tokenExp: return ;
            case Token.err.tokenNotFound: return ;
            default: return;
        }
    }
}

function getPayload (  ) {
    
}

function verifyPayload ( payload ) {
    
}

module.exports.AccessToken = { newToken, verify, getPayload };