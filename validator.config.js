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
    unit : Joi.string().trim().min( 1 ).max( 5  ).required(),
    qty  : Joi.number().positive().required(),
} ;

const sellerSchema = {
    name : Joi.string().trim().min( 1 ).max( 50 ).required(),
} ;

// ---------- Common Schema ---------- //

const commonSchema = {

    _id : Joi.string().length(24),
    itemNameQtyPair: Joi.object().pattern( itemSchema.name, itemSchema.qty ).required(),
    pageNo : Joi.number().min(0).max(100).required(),

}

// ---------- User ---------- //
module.exports.user = {

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
        SellerName : sellerSchema.name,
    }),
    
} ;

// ---------- Purchase ---------- //
module.exports.purchase = {

    create : Joi.object({
        SellerName : sellerSchema.name,
        Items      : commonSchema.itemNameQtyPair,
    }),
    
    update : Joi.object({
        PurchaseID : commonSchema._id.required(),
        SellerName : sellerSchema.name,
        Items : commonSchema.itemNameQtyPair,
    }),

    detail : Joi.object({
        PurchaseID : commonSchema._id.required(),
    }),

    list : Joi.object({
        PageNo : commonSchema.pageNo,
        UserID : commonSchema._id,
    }),

    listEdits : Joi.object({
        PurchaseID : commonSchema._id.required(),
        EditIndex : commonSchema.pageNo,
    }),

    delete : Joi.object({
        PurchaseID: commonSchema._id.required(),
    }),

} ;

// ---------- Sale ---------- //
module.exports.sale = {

    create : Joi.object({
        Items : commonSchema.itemNameQtyPair,
    }),
    
    update : Joi.object({
        SaleID : commonSchema._id.required(),
        Items : commonSchema.itemNameQtyPair,
    }),

    detail : Joi.object({
        SaleID : commonSchema._id.required(),
    }),

    list : Joi.object({
        PageNo : commonSchema.pageNo,
        UserID : commonSchema._id,
    }),
    
    listEdits : Joi.object({
        SaleID : commonSchema._id.required(),
        EditIndex : commonSchema.pageNo,
    }),

    delete : Joi.object({
        SaleID: commonSchema._id.required(),
    }),

} ;

module.exports.auth = {
    refreshToken : Joi.forbidden(),
    accessToken  : Joi.forbidden(),
} ;
