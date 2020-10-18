const Joi = require( '@hapi/joi' ) ;

const userSchema = {
    email    : Joi.string().trim().min( 1 ).max( 50 ).required(),
    pass     : Joi.string().trim().min( 1 ).max( 50 ).required(),
    fullName : Joi.string().trim().min( 1 ).max( 50 ).required(),
    type     : Joi.string().trim().min( 1 ).max( 1  ).required(),
} ;

const user = {

    signUp : Joi.object({
        FullName : userSchema.fullName,
        Email    : userSchema.email,
        Password : userSchema.pass,
        Type     : userSchema.type,
    }),
    
    signIn : Joi.object({
        Email    : userSchema.email,
        Password : userSchema.pass,
    }),

    signOut : Joi.object({}),

} ;

module.exports = { userSchema, user };
