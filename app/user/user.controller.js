const User    = require( './user.model' ) ;
const respond = require( '../../response' ) ;
const Token = require( '../../middleware/token' ) ;

module.exports.signUp = async ( req, res ) => {
    const userData  = req.body ;
    userData.UserID = req.UserID ;  // UserID of the person creating this account
    await User.AddNewUser( userData ) ;
    respond.ok( res ) ;
}

module.exports.signIn = async ( req, res, next ) => {

    const userCredential = req.body ;
    const userDoc = await User.SignIn( userCredential ) ;

    await Token.genRefreshTokenAndAddToCookie( res, userDoc );

    respond.ok( res,{ AccessToken : await Token.genAccessToken( userDoc ) } ) ;
    return next() ;

}

module.exports.signOut = ( req, res ) => {
    res.clearCookie('RefreshToken') ;     return respond.ok( res ) ;
}