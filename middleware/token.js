const jwt      = require( 'jsonwebtoken' ) ;
const express  = require( 'express'      ) ;
const mongoose = require( 'mongoose'     ) ;

const router = express.Router() ;
const User = mongoose.model( 'users' ) ;
const { NO_TOKEN_REQUIRED_URL } = require( '../server.config' ).CONFIG.ACCESSIBLE_URL ; 
const { ACCESS_TOKEN, REFRESH_TOKEN } = require( '../server.config' ).CONFIG.TOKEN ;


const respond = require( '../response.js' ) ;
const errData = respond.errData ;

async function getUserDataFromDB ( UserID, UserType, UserTS ) {
    const userDoc = await User.findOne( { _id: UserID, TS: UserTS }, { _id:1, Type:1, TS:1 } ) ;
    if ( !userDoc ) throw { err : errData.invalidToken } ;
    return userDoc ;
}

router.get( '/ref-tok', async ( req, res, next ) => {
    const userDoc = await getUserDataFromDB( req.UserID, req.UserType, req.UserTS ) ; 
    userDoc.TS = Date.now() ; await userDoc.save() ;
    await this.genRefreshTokenAndAddToCookie( res, userDoc ) ;
    respond.ok( res, { AccessToken : await this.genAccessToken( userDoc ) } ) ;
    return next() ;
}) ;

router.get( '/acc-tok' , async ( req, res, next ) => {
    const userDoc = await getUserDataFromDB( req.UserID, req.UserType, req.UserTS ) ;
    respond.ok( res, { AccessToken : await this.genAccessToken( userDoc ) } ) ;
    return next() ;
}) ;

module.exports.verifyToken = ( req, res, next ) => {

    let accTok, refTok ;
    
    try {// First verify 'AccessToken' and then retrieve UserID & UserType
        const AccessToken  = req.header( 'Authorization' ) ;
        // At first when the user reload the page AccessToken will be an empty string
        // So only verify if accTok exist throw an error stating that accessToken is expired
        if( AccessToken === "" ) throw { name: "AccessTokenNotFound" } ;
        accTok = jwt.verify( AccessToken , ACCESS_TOKEN.KEY ) ;
        req.UserType = accTok.utyp ;    

    } catch ( err ) {
        if ( NO_TOKEN_REQUIRED_URL.has( req.url ) === false ) {
            if ( err.name === 'JsonWebTokenError'   ) throw { err: errData.invalidToken        } ;
            if ( err.name === 'TokenExpiredError'   ) throw { err: errData.AccessTokenExpired  } ;
            if ( err.name === 'AccessTokenNotFound' ) throw { err: errData.AccessTokenNotFound } ;
            
            else                                    throw err                                 ;
        }
    }
    // return next() ; // -pop

    // Verify 'RefreshToken' and retrieve UserTimeStamp ( TimeStamp when ref tok was created ) it is also saved in Database
    try {
        const RefreshToken = req.cookies.RefreshToken ;
        refTok = jwt.verify( RefreshToken , REFRESH_TOKEN.KEY) ;        
        req.UserTS = refTok.uts ;
        req.UserID = refTok.uid ;
        if ( accTok && accTok.uid !== refTok.uid ) throw { err: errData.invalidToken }       ;

    } catch ( err ) {
        if ( NO_TOKEN_REQUIRED_URL.has( req.url ) === false ) {
            if ( err.name === 'JsonWebTokenError' ) throw { err: errData.invalidToken        } ;
            if ( err.name === 'TokenExpiredError' ) throw { err: errData.RefreshTokenExpired } ;
            else                                    throw err                                  ;
        }
    }       

    return next() ;
    
}

module.exports.genAccessToken = async ( userDoc ) => {
    const payload = { uid:userDoc._id, utyp:userDoc.Type }
    return jwt.sign( payload, ACCESS_TOKEN.KEY, { expiresIn : ACCESS_TOKEN.EXPIRY  } ) ; 
}

module.exports.genRefreshTokenAndAddToCookie = async ( res, userDoc ) => {
    const payload = { uid: userDoc._id, uts: userDoc.TS } ;
    const signedRefreshToken = jwt.sign( payload, REFRESH_TOKEN.KEY, { expiresIn : REFRESH_TOKEN.EXPIRY } ) ;
    const refreshTokenCookieProperty = { maxAge : REFRESH_TOKEN.MAX_AGE , httpOnly : true } ;
    res.cookie( 'RefreshToken',  signedRefreshToken, refreshTokenCookieProperty ) ;
}

module.exports.router = router ;