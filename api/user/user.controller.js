const User = require( './user.model.js' ) ;
const handler = require( '../../handler.js' ) ;

module.exports.login = async (req, res) => {
    try {
        const { Email, Password } = req.body ;
        const user = await User.findByCredentials( Email, Password ) ;
        const token = await user.generateAuthToken() ;
        const resData = { token : token, userType : user.Type } ;
        handler.send( res, 200, resData ) ;
    } catch ( error ) {
       handler.send( res, 400, handler.errData.invalidCredential ) ;
    }
}

module.exports.signup = ( req, res ) => {
    var user = new User() ;
    Object.assign( user, req.body ) ;
    user.save()
        .then( value => {
            handler.send( res, 200 ) ;
        })
        .catch( err => {
            if( err.name === 'ValidationError' )
                handler.send( res, 400, handler.errData.missingField ) ;
            else    
                handler.send( res, 400, handler.errData.dupEmail ) ;
        });
}