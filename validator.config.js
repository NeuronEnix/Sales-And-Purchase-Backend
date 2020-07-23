const Joi = require( '@hapi/joi' ) ;

//////////////////////////////////////////////
// Min - Max
const User = {
    email    : { min : 1, max : 50 },
    pass     : { min : 1, max : 50 },
    fullName : { min : 1, max : 50 },
    type     : { min : 1, max : 1  },
} ;

const Item = {
    name : { min : 1, max : 50 },
    unit : { min : 1, max : 5 },

} ;

const Seller = {
    name : { min : 1, max : 50 },
} ;

const Purchase = {
    items : { min : 1, max : 100 },
} ;

const Sale = {
    items : Purchase.items,
} ;
//////////////////////////////////////////////

// ---------- Common Schema ---------- //
const itemNameQtyPair = Joi.object({
    Name : Joi.string().trim().min( Item.name.min ).max( Item.name.max ).required(),
    Qty  : Joi.number().positive().required(),
}) ;

// ---------- User ---------- //
module.exports.user = {
    
    login : Joi.object({
        Email    : Joi.string().trim().min( User.email.min ).max( User.email.max ).required(),
        Password : Joi.string().trim().min( User.pass.min  ).max( User.pass.max  ).required(),
    }),

    logout : Joi.forbidden(),

    signup : Joi.object({
        FullName : Joi.string().trim().min( User.fullName.min ).max( User.fullName.max ).required(),
        Email    : Joi.string().trim().min( User.email.min    ).max( User.email.max    ).required(),
        Password : Joi.string().trim().min( User.pass.min     ).max( User.pass.max     ).required(),
        Type     : Joi.string().trim().min( User.type.min     ).max( User.type.max     ).required(),
    }),

} ;

// ---------- Item ---------- //
module.exports.item = {

    add : Joi.object({
        Name : Joi.string().trim().min( Item.name.min ).max( Item.name.max ).required(),
        Unit : Joi.string().trim().min( Item.unit.min ).max( Item.unit.max ).required(),
        Qty  : Joi.number().positive().required(),
    }),

    search : Joi.object({
        S : Joi.string().trim().min( Item.name.min ).max( Item.name.max ).required(),
    }),

    detail : Joi.object({
        Name : Joi.string().trim().min( Item.name.min ).max( Item.name.max ).required(),
    }),

    update : Joi.object({
        Name : Joi.string().trim().min( Item.name.min ).max( Item.name.max ).required(),
        Unit : Joi.string().trim().min( Item.unit.min ).max( Item.unit.max ).required(),
        Qty  : Joi.number().positive().required(),
    }).or( 'Unit', 'Qty' ),

} ;

// ---------- Seller ---------- //
module.exports.seller = {

    add : Joi.object({
        Name : Joi.string().trim().min( Seller.name.min ).max( Seller.name.max ).required(),
    }),

    search : Joi.object({
        S : Joi.string().trim().min( Seller.name.min ).max( Seller.name.max ).required(),
    }),
    

} ;

// ---------- Purchase ---------- //
module.exports.purchase = {

    create : Joi.object({
        SellerName : Joi.string().trim().min( Seller.name.min ).max( Seller.name.max ).required(),
        Items      : Joi.array().items( itemNameQtyPair ).min( Purchase.items.min ).max( Purchase.items.max ).required(),
    }),
    
    detail : Joi.object({
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
        Items : Joi.array().items( itemNameQtyPair ).min( Sale.items.min ).max( Sale.items.max ).required(),
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
}
