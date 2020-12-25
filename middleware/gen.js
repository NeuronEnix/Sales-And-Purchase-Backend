const { AccessToken }  = require( "./Token Controllers/AccessToken"  )
const { RefreshToken } = require( "./Token Controllers/RefreshToken" )
module.exports = Token = {

    newAccessToken : ( req, res, next ) => {
        // AccessToken.newToken( req, res );
    },
    
    newRefreshToken : ( req, res, next ) => {
        
    },

    verify : ( req, res, next ) => {

    }    

}

