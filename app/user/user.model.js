const bcrypt   = require( 'bcryptjs' ) ;
const mongoose = require( 'mongoose' ) ;
const { DEFAULT_ADMIN_DATA } = require('../../server.config').CONFIG;
const errData  = require( '../../response.js' ).errData ;
const { BCRYPT } = require( '../../server.config').CONFIG ;

var userSchema = new mongoose.Schema ({
    Email    : { type : String, index: { unique: true } },
    Password : String,
    FullName : String,
    TS       : Date, // RefreshToken creation time
    Type     : { type : String, default: 'e' },     // 'a' -> admin  ; 'e' -> employee
    Status   : { type : String, default :'a' },     // 'a' -> active ; 'd' -> disabled
    UserID   : {                                    // _id of the user who creates a new User
        type : mongoose.Schema.Types.ObjectId, required : true
    },
});

userSchema.statics.AddNewUser = async ( userData ) => {
    try {
        const user = new User() ;
        userData.Password = await bcrypt.hash( userData.Password, BCRYPT.ROUNDS ) ;
        Object.assign( user, userData ) ;
        return await user.save() ;
    } catch ( err ) {
        if ( err.code === 11000 )
            throw { err : errData.duplicateErr, info : 'Email Already Exist' };
        throw err ;
    }
}

userSchema.statics.SignIn = async ( { Email, Password } ) => {
    const user = await User.findOne( { Email } , { Password:1, Type:1 } ) ;
    if ( user ) {
        const passMatched = await bcrypt.compare( Password, user.Password ) ;
        if ( passMatched ) {
            user.TS = Date.now() ;
            return await user.save() ;
        }
    }
    throw { err : errData.invalidCredential, info : 'Email or Password is Incorrect!' } ;
}

const User = mongoose.model( 'users', userSchema ) ;
module.exports = User;

async function createAdminIfUserCollectionIsEmpty() {
    try {
        console.log( "Check :: Existence of users")
        if ( await User.estimatedDocumentCount() == 0 ) {
            
            if ( !DEFAULT_ADMIN_DATA.Email || !DEFAULT_ADMIN_DATA.Password )
                return console.log( "Check :: Could not Create Admin, defaultAdmin Email not provided" );
            await User.AddNewUser( DEFAULT_ADMIN_DATA );
            console.log( "Check :: User Collection is empty: Admin Created!" );
        }
        console.log( "Check :: Users Exist")
    } catch ( err ) {
        console.log( "Check :: Couldn't Create Admin", err )
    }
}
createAdminIfUserCollectionIsEmpty();