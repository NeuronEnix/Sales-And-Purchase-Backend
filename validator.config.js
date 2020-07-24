const Joi = require( '@hapi/joi' ) ;

//////////////////////////////////////////////
// Min - Max
const userSchema = {
    email    : Joi.string().trim().min( 1 ).max( 50 ).required(),
    pass     : Joi.string().trim().min( 1 ).max( 50 ).required(),
    fullName : Joi.string().trim().min( 1 ).max( 50 ).required(),
    type     : Joi.string().trim().min( 1 ).max( 1  ).required(),
} ;

const itemSchema = {
    name : Joi.string().trim().min( 1 ).max( 50 ).required(),
    unit : Joi.string().trim().min( 1 ).max( 3  ).required(),
    qty  : Joi.number().positive().required(),
} ;

const sellerSchema = {
    name : Joi.string().trim().min( 1 ).max( 50 ).required(),
} ;

// ---------- Common Schema ---------- //
const itemNameQtyPairSchema = Joi.array().items(
    Joi.object({
        Name : itemSchema.name,
        Qty  : itemSchema.qty,
    })
).min( 1 ).max( 50 ).required() ;

// ---------- User ---------- //
module.exports.user = {
    
    login : Joi.object({
        Email    : userSchema.email,
        Password : userSchema.pass,
    }),

    logout : Joi.forbidden(),

    signup : Joi.object({
        FullName : userSchema.fullName,
        Email    : userSchema.email,
        Password : userSchema.pass,
        Type     : userSchema.type,
    }),

} ;

// ---------- Item ---------- //
module.exports.item = {

    add : Joi.object({
        Name : itemSchema.name,
        Unit : itemSchema.unit,
        Qty  : itemSchema.qty,
    }),

    search : Joi.object({
        S : itemSchema.name,
    }),

    detail : Joi.object({
        Name : itemSchema.name,
    }),

    update : Joi.object({
        Name : itemSchema.name,
        Unit : itemSchema.unit,
        Qty  : itemSchema.qty,
    }).or( 'Unit', 'Qty' ),

} ;

// ---------- Seller ---------- //
module.exports.seller = {

    add : Joi.object({
        Name : sellerSchema.name,
    }),

    search : Joi.object({
        S : sellerSchema.name,
    }),
    
} ;

// ---------- Purchase ---------- //
module.exports.purchase = {

    create : Joi.object({
        SellerName : sellerSchema.name,
        Items      : itemNameQtyPairSchema,
    }),
    
    detail : Joi.object({
        _id: Joi.string().length(24)
    }),

    delete : Joi.object({
        _id: Joi.string().length(24)
    }),
    
    listMy : Joi.object({
        P : Joi.number().required()
    }),
    
    listAll : Joi.object({
        P : Joi.number().required()
    }),

} ;

// ---------- Sale ---------- //
module.exports.sale = {

    create : Joi.object({
        Items : itemNameQtyPairSchema
    }),

    listMy : Joi.object({
        P : Joi.number().positive().required()
    }),
    
    listAll : Joi.object({
        P : Joi.number().positive().required()
    }),
    
} ;

module.exports.auth = {
    refreshToken : Joi.forbidden(),
    accessToken  : Joi.forbidden(),
} ;
