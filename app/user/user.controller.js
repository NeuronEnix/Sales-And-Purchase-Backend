const User    = require( './user.model.js' ) ;
const respond = require( '../../response.js' ) ;
const { newAccessToken, newRefreshToken } = require( '../../middleware/auth.js' ) ;
const { response } = require('express');

module.exports.signup = async ( req, res ) => {
    try {
        req.body.UserID = req.UserID ;   // UserID of the person creating this account
        const userData  = req.body ;
        await User.AddNewUser( userData ) ;
        respond.ok( res ) ;
    } catch( err ) {
        respond.err( res, err ) ;
    }
}

module.exports.login = async ( req, res ) => {
    try {
        const userCredential = req.body ;
        const user = await User.LookUp( userCredential ) ;
        await newRefreshToken( res, user ) ;
        return respond.ok( res, { AccessToken : newAccessToken( user ), Type : user.Type } ) ;
    } catch ( err ) {
        respond.err( res, err ) ;
    }
}

module.exports.logout = ( req, res ) => {
    res.clearCookie('RefreshToken') ;     return respond.ok( res ) ;
}