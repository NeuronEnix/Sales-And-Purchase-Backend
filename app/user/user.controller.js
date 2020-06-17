const jwt = require( 'jsonwebtoken' ) ;
const User = require( './user.model.js' ) ;
const respond = require( '../../response.js' ) ;
const { JWT_KEY, JWT_EXPIRES_IN } = process.env ;

module.exports.signup = async ( req, res ) => {
    try {
        req.body.UserID = req.user._id ;    // UserID of the person creating this account
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
        user.Token = jwt.sign( { _id : user._id }, JWT_KEY, { expiresIn : JWT_EXPIRES_IN } ) ; 
        user.save() ;
        const resData = { userToken : user.Token, userType : user.Type } ;
        respond.ok( res, resData ) ;
    } catch ( err ) {
        console.log('kori')
        respond.err( res, err ) ;
    }
}