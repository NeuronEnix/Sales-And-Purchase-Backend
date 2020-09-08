const Joi = require( '@hapi/joi' ) ;
const { number } = require('@hapi/joi');

//////////////////////////////////////////////
// Min - Max
const userSchema = {
    email    : Joi.string().trim().min( 1 ).max( 50 ).required(),
    pass     : Joi.string().trim().min( 1 ).max( 50 ).required(),
    fullName : Joi.string().trim().min( 1 ).max( 50 ).required(),
    type     : Joi.string().trim().min( 1 ).max( 1  ).required(),
} ;

const itemSchema = {
    name : Joi.string().alphanum().trim().min( 1 ).max( 50 ).required(),
    unit : Joi.string().trim().min( 1 ).max( 5  ).required(),
    qty  : Joi.number().positive().required(),
} ;

const sellerSchema = {
    name : Joi.string().alphanum().trim().min( 1 ).max( 50 ).required(),
} ;

// ---------- Common Schema ---------- //
const commonSchema = {

    _id : Joi.string().length(24).required(),

    // itemNameQtyPair : Joi.array().items(
    //     Joi.object({
    //         Name : itemSchema.name,
    //         Qty  : itemSchema.qty,
    //     })
    // ).min( 1 ).max( 50 ).required(),
    itemNameQtyPair: Joi.object().pattern(/\w{2,25}/, itemSchema.qty ),
    pageNo : Joi.number().required(),

}

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

    update : Joi.object({
        Name : itemSchema.name,
        Unit : itemSchema.unit,
        Qty  : itemSchema.qty,
    }).or( 'Unit', 'Qty' ),

    search : Joi.object({
        ItemName : itemSchema.name,
    }),

    detail : Joi.object({
        ItemName : itemSchema.name,
    }),

    stock : Joi.object({
            PageNo : Joi.number()
    }),

    purchases : Joi.object({
        PageNo : Joi.number(),
        ItemName : itemSchema.name,
    }),

    sales : Joi.object({
        PageNo : Joi.number(),
        ItemName : itemSchema.name,
    }),
    

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
        Items      : commonSchema.itemNameQtyPair,
    }),
    
    update : Joi.object({
        PurchaseID : commonSchema._id,
        SellerName : sellerSchema.name,
        Items : commonSchema.itemNameQtyPair,
    }),
    
    delete : Joi.object({
        PurchaseID: commonSchema._id
    }),

} ;

// ---------- Sale ---------- //
module.exports.sale = {

    create : Joi.object({
        Items : commonSchema.itemNameQtyPair
    }),
    
    update : Joi.object({
        SaleID : commonSchema._id,
        Items : commonSchema.itemNameQtyPair,
    }),

    delete : Joi.object({
        SaleID: commonSchema._id
    }),
    
} ;

module.exports.auth = {
    refreshToken : Joi.forbidden(),
    accessToken  : Joi.forbidden(),
} ;
