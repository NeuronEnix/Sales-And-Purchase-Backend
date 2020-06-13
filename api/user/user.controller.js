const User = require( './user.model.js' ) ;
const respond = require( '../../response.js' ) ;

module.exports.login = async ( req, res ) => {
    
    const { Email, Password } = req.body ;
    try{
        const user    = await User.lookUp( { Email, Password } ) ;
        console.log('email, pass matched ') ;
        const token   = await user.genToken() ;
        console.log( 'token generated') ;
        const resData = { token : token, userType : user.Type } ;
        respond.ok( res, resData ) ;
    } catch ( err ) {
        console.log('login err!!!') ;
        respond.err( res, err ) ;
    }
}

module.exports.signup = async ( req, res ) => {
    const { FullName, Email, Password, Type, UserID } = req.body ; // UserID -> _id of the account creator 
    try{
        const user = await User.add( { FullName, Email, Password, Type, UserID } ) ;
        console.log('user created ' ) ;
        console.log( { user : user } ) ;
        respond.ok( res ) ;
    } catch( err ) {
        respond.err( res, err ) ;
    }
}