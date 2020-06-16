const jwt = require( 'jsonwebtoken' ) ;
const bcrypt = require( 'bcryptjs' ) ;
const mongoose = require( 'mongoose' ) ;
const errData = require( '../../response.js' ).errData ;

var userSchema = new mongoose.Schema ({
    Email    : { type : String, unique : true },
    Password : String,
    FullName : String,
    Token    : String,
    Type     : { type : String, default: 'e' },     // 'a' -> admin  ; 'e' -> employee
    Status   : { type : String, default :'a' },     // 'a' -> active ; 'd' -> disabled
    UserID   : {                                    // _id of the user who creates a new User
        type : mongoose.Schema.Types.ObjectId, required : true
    },
});

userSchema.statics.AddNewUser = async ( userData ) => {
    try {
        const user = new User() ;
        Object.assign( user, userData ) ;
        return await user.save() ;
    } catch ( err ) {
        if ( err.code === 11000 )
            throw { err : errData.duplicateErr, info : 'Email' };
        throw err ;
    }
}

userSchema.statics.LookUp = async ( { Email, Password } ) => {
    const user = await User.findOne( { Email } ) ;
    if ( user ) {
        const passMatched = await bcrypt.compare( Password, user.Password ) ;
        if ( passMatched ) return user ;
    }
    throw { err : errData.invalidCredential, info : 'Email or Pass' } ;
}

const User = mongoose.model( 'users', userSchema ) ;
module.exports = User;
