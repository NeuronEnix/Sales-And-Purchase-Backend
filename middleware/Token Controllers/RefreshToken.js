const Token = require( "./Token" );

const REF_TOK_KEY = "yo";
const REF_TOK_EXP = "2d";
const REF_TOK_COOKIE_EXP = 2 * 24 * 60 * 60 * 100 ;

function create( payload ) {
    return Token.create( payload, REF_TOK_KEY, REF_TOK_EXP );
}

function verify( tokenString ) {
    try {
        return Token.verify( tokenString, REF_TOK_KEY );
    } catch ( err ) {
        switch ( err ) {
            case Token.err.tokenErr: return ;
            case Token.err.tokenExp: return ;
            case Token.err.tokenNotFound: return ;
            default: return;
        }
    }
}

module.exports.RefreshToken = { create, verify }