const moment  = require( 'moment' ) ;
const jwt     = require( 'jsonwebtoken' ) ;
const router  = require( 'express' ).Router() ;

const respond = require( '../response.js' ) ;
const User    = require( '../app/user/user.model.js' ) ;
const errData = respond.errData ;

const { ACCESS_TOKEN_KEY , ACCESS_TOKEN_EXPIRY  } = process.env ;
const { REFRESH_TOKEN_KEY, REFRESH_TOKEN_EXPIRY } = process.env ;

REFRESH_TOKEN_MAX_AGE = eval( process.env.REFRESH_TOKEN_MAX_AGE ) ;
const skipURL = new Set( [ '/user/login', '/auth/access-token', '/auth/refresh-token', '/user/logout' ] ) ;
const nonAdminAccessibleURL = new Set( [ '/sale/create' ] )
let ID = 1;

const authorize = async( req, res, next ) => {
    try {
        console.log( '\n\n' ) ; // -Deb
        console.log( { ID : ID, URL : req.url, Method : req.method, Body : req.body, } ) ; // -deb
        res.ID = ID++ ;    res._TS = new Date() ; // -Deb
        
        const AccessToken  = req.header( 'Authorization' ) ;
        const RefreshToken = req.cookies.RefreshToken ;  
        // console.log( `AT :  ${AccessToken}` ) ;
        // console.log( `RT :  ${RefreshToken}` ) ;
        const { _id }  = jwt.verify( AccessToken , ACCESS_TOKEN_KEY  ) ;      // --
        const { Type } =  jwt.verify( RefreshToken, REFRESH_TOKEN_KEY ) ;      // --
        req.UserID = _id ;

        if ( req.method === 'GET' || Type === 'a' ||  nonAdminAccessibleURL.has( req.url ) )   // --
        return next();
        else respond.err( res, errData.unAuthorized ) ;      // --

    } catch ( err ) {
        if ( skipURL.has( req.url ) )           return next() ;
        console.log( 'token rr') //-Dev
        if ( err.name === 'JsonWebTokenError' ) return respond.err( res, { err : errData.invalidToken } ) ;
        if ( err.name === 'TokenExpiredError' ) return respond.err( res, { err : errData.AccessTokenExpired } ) ;
        else                                    return respond.err( res, err ) ;
    }
}

module.exports.validateRefreshToken = async ( req, res, next ) => {
    try {
        // const user = await devValidation( req ) ; // -Dev
        const { _id, Type, TS } = jwt.verify( req.cookies.RefreshToken , REFRESH_TOKEN_KEY ) ;     // --
        const user = await User.findOne( { _id, TS }, { TS, Type } )                // --
        if ( ! moment( TS ).isSame( moment( user.TS) ) ) throw 'err' ;
        req.user = user ;
        return next() ;
    } catch ( err ) { // Add invalid case 
        // console.log( 'at valRef')
        return respond.err( res, { err : errData.RefreshTokenExpired } ) ;
    }
}
module.exports.newAccessToken = ( user ) => {
    return jwt.sign( {_id:user._id}, ACCESS_TOKEN_KEY , { expiresIn : ACCESS_TOKEN_EXPIRY  } ) ; 
}
module.exports.newRefreshToken = async ( res, user ) => {
    user.TS = moment() ;
    const userSave = user.save() ;
    const { _id, Type, TS } = user 
    const RefreshToken = jwt.sign( {_id,Type,TS}, REFRESH_TOKEN_KEY, { expiresIn : REFRESH_TOKEN_EXPIRY } )
    res.cookie( 'RefreshToken',  RefreshToken, {
        maxAge   : REFRESH_TOKEN_MAX_AGE ,
        httpOnly : true
    }) ;
    return await userSave ;
}

router.post( '/refresh-token' , async ( req, res ) => {
    try {
        await this.newRefreshToken( res, req.user ) ;
        return respond.ok( res, { AccessToken : this.newAccessToken( req.user ) } ) ;
    } catch( err ) {
        return respond.err( res, err ) ;
    }
}) ;

router.post( '/access-token', async ( req, res ) => {
    return respond.ok( res, { AccessToken : this.newAccessToken( req.user ), Type : req.user.Type } ) ;
}) ;

// Dev only!!!!!!!!!
const devValidation = async req => {
    console.log( 'refresh token verified')
    const AccessToken = req.header( 'Authorization' ) ;
    const { _id }= jwt.verify( AccessToken, ACCESS_TOKEN_KEY ) ;
    const user    = await User.findOne( { _id }, { _id:1 } ) ;
    return user ;
}

module.exports.router = router ;
module.exports.authorize = authorize ;