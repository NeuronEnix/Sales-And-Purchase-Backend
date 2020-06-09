const jwt = require( 'jsonwebtoken' ) ;
const bcrypt = require( 'bcryptjs' ) ;
const mongoose = require( 'mongoose' ) ;

var userSchema = new mongoose.Schema ({
    FullName : {
        type : String,
        trim : true,
        required : true
    },
    Email : {
        type : String,
        unique : true,
        required : true
    },
    Password : {
        type : String,
        required : true
        },
    Type :{
        type : String,
        required : true
    },
    Token : {
        type: String
    }
});

userSchema.pre( 'save', async function (next) {// hashes pass before commiting to db
    const user = this;
    if ( user.isModified( 'Password' )) {
        user.Password = await bcrypt.hash( user.Password, Math.random() );
    }
    next();
})

userSchema.methods.generateAuthToken = async function() {
    const user  = this ;
    const token = jwt.sign( {_id: user._id}, process.env.JWT_KEY, {expiresIn: '1d'} ) ;
    user.Token  = token ;
    await user.save() ;
    return token ;
}

userSchema.statics.findByCredentials = async ( Email, Password ) => {
    const user = await User.findOne( { Email } ) ;
    if ( !user ) {
        throw new Error({ error: 'Invalid login credentials' }) ;
    }
    const isPasswordMatch = await bcrypt.compare( Password, user.Password ) ;
    if ( !isPasswordMatch ) {
        throw new Error({ error: 'Invalid login credentials' }) ;
    }
    return user ;
}

const User = mongoose.model( 'users', userSchema ) ;
module.exports = User;
