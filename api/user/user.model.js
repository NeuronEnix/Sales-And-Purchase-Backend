const jwt = require( 'jsonwebtoken' ) ;
const bcrypt = require( 'bcryptjs' ) ;
const mongoose = require( 'mongoose' ) ;
const errData = require( '../../response.js' ).errData

var userSchema = new mongoose.Schema ({
    UserID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    FullName : {
        type : String, trim : true, required : true,
        maxlength : 10, minlength : 5
    },
    Email : {
        type : String, unique : true, required : true
    },
    Password : {
        type : String, required : true
        },
    Type :{
        type : String, default: 'e',
    },
    Token : {
        type: String
    },
    Status : {
        type : String, default : 'a',
    }
});

userSchema.statics.addUser = async ( userData ) => {
    const { FullName, Email, Password } = userData
    if( FullName && Email && Password )
        console.log( 'mandatory fields present')
    else { console.log(' missing field' ) ; throw errData.missingField ; }
    const userFound = await User.findOne( { Email } )
    if( userFound ) {
        console.log( 'dup email') ;
        throw errData.dupEmail ;
    } else {
        console.log( 'hashing pass') ;
        userData.Password = await bcrypt.hash( Password, parseInt(process.env.bcryptRounds,10) );
        console.log( 'pass hashed') ;
        const user = new User() ;
        Object.assign( user, userData ) ;
        try {
            return await user.save() ;
        } catch( err ) {
            console.log( 'err : StackTrace...' )
            if( err.name === 'ValidationError' ) {
                console.log( 'ValidationError : ')
                for (field in err.errors) {
                    console.log( field)
                }
                throw errData.validationErr ;
            }
            else 
                throw errData.signupErr ;
        }
    } 
}
userSchema.methods.genToken = async function() {
    const user  = this ;
    console.log( 'signing token')
    try{
        user.Token = jwt.sign( { _id : user._id }, process.env.JWT_KEY, { expiresIn: '1d' } ) ;    
        console.log( 'toke signed') ;
    } catch( err ) {
        console.log( 'Error : Couldnt sign the token' ) ;
        throw errData.tokenErr ;
    }
    try {
        await user.save() ; console.log( 'token saved to db' ) ;
    } catch( err ) {
        console.log( 'err : Failed to commit to db' ) ; throw errData.dbCommitErr ;
    }
    return user.Token ;
}

userSchema.statics.lookUp = async ( { Email, Password } ) => {
    if( Email && Password ) {
        const user = await User.findOne( { Email } ) ;
        if( user ) {
            console.log( 'email matched...comparing pass ') ;
            const passMatched = await bcrypt.compare( Password, user.Password ) ;
            if( passMatched ){ 
                console.log( 'pass matched') ; 
                return user ; 
            }
            console.log( 'pass not matched') ;
        }
        console.log( 'email not matched') ;
        throw errData.invalidCredential ;
    }
    console.log( 'missing field') ;
    throw errData.missingField ;
}

const User = mongoose.model( 'users', userSchema ) ;
module.exports = User;
