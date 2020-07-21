const User    = require( './user.model.js' ) ;
const respond = require( '../../response.js' ) ;
const { newAccessToken, newRefreshToken } = require( '../../middleware/auth.js' ) ;
const { response } = require('express');

module.exports.signup = async ( req, res ) => {
    const userData  = req.body ;
    userData.UserID = req.UserID ;  // UserID of the person creating this account
    await User.AddNewUser( userData ) ;
    respond.ok( res ) ;
}

module.exports.login = async ( req, res ) => {
    const userCredential = req.body ;
    const user = await User.LookUp( userCredential ) ;
    await newRefreshToken( res, user ) ;
    return respond.ok( res, { AccessToken : newAccessToken( user ), Type : user.Type } ) ;
}

module.exports.logout = ( req, res ) => {
    res.clearCookie('RefreshToken') ;     return respond.ok( res ) ;
}