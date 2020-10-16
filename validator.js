const respond = require( './response' ) ;
const errData = respond.errData ;

const { user, item, seller, purchase, sale } = require( './validator.config.js' ) ;

const validate = async ( req, res, next, schema ) => {
    try { 

        let dataToBeValidated ;
        if ( req.method === "GET" ) dataToBeValidated = req.query ;
        else                        dataToBeValidated = req.body  ;

        await schema.validateAsync( dataToBeValidated ) ; 
        return next() ;

    } catch ( err ) { 
        const validationErr =  { err : errData.validationErr, info : err.details[0].message } ;
        respond.err( res, validationErr ) ;
    }
} ;

module.exports.validator = {

    user : {
        signUp  : ( req, res, next ) => { validate( req, res, next, user.signUp  ) },
        signIn  : ( req, res, next ) => { validate( req, res, next, user.signIn  ) },
        signOut : ( req, res, next ) => { validate( req, res, next, user.signOut ) },
    }, 

    item : {
        add       : ( req, res, next ) => { validate( req, res, next, item.add       ) },
        sales     : ( req, res, next ) => { validate( req, res, next, item.sales     ) },
        stock     : ( req, res, next ) => { validate( req, res, next, item.stock     ) },
        search    : ( req, res, next ) => { validate( req, res, next, item.search    ) },
        detail    : ( req, res, next ) => { validate( req, res, next, item.detail    ) },
        update    : ( req, res, next ) => { validate( req, res, next, item.update    ) },
        purchases : ( req, res, next ) => { validate( req, res, next, item.purchases ) },
    },

    seller : {
        add    : ( req, res, next ) => { validate( req, res, next, seller.add    ) },
        search : ( req, res, next ) => { validate( req, res, next, seller.search ) },
    },

    purchase : {
        create    : ( req, res, next ) => { validate( req, res, next, purchase.create    ) },
        update    : ( req, res, next ) => { validate( req, res, next, purchase.update    ) },
        detail    : ( req, res, next ) => { validate( req, res, next, purchase.detail    ) },
        list      : ( req, res, next ) => { validate( req, res, next, purchase.list      ) },
        listEdits : ( req, res, next ) => { validate( req, res, next, purchase.listEdits ) },
        delete    : ( req, res, next ) => { validate( req, res, next, purchase.delete    ) },
    },

    sale : {
        create    : ( req, res, next ) => { validate( req, res, next, sale.create    ) },
        update    : ( req, res, next ) => { validate( req, res, next, sale.update    ) },
        detail    : ( req, res, next ) => { validate( req, res, next, sale.detail    ) },
        list      : ( req, res, next ) => { validate( req, res, next, sale.list      ) },
        listEdits : ( req, res, next ) => { validate( req, res, next, sale.listEdits ) },
        delete    : ( req, res, next ) => { validate( req, res, next, sale.delete    ) },
    },
}