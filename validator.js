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
        login  : ( req, res, next ) => { validate( req, res, next, user.login  ) },
        logout : ( req, res, next ) => { validate( req, res, next, user.logout ) },
        signup : ( req, res, next ) => { validate( req, res, next, user.signup ) },
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

    sale : {
        create  : ( req, res, next ) => { validate( req, res, next, sale.create  ) },
        detail  : ( req, res, next ) => { validate( req, res, next, sale.detail  ) },
        update  : ( req, res, next ) => { validate( req, res, next, sale.update  ) },
        delete  : ( req, res, next ) => { validate( req, res, next, sale.delete  ) },
        listAll : ( req, res, next ) => { validate( req, res, next, sale.listAll ) },
        listMy  : ( req, res, next ) => { validate( req, res, next, sale.listMy  ) },
    },

    purchase : {
        create  : ( req, res, next ) => { validate( req, res, next, purchase.create  ) },
        detail  : ( req, res, next ) => { validate( req, res, next, purchase.detail  ) },
        update  : ( req, res, next ) => { validate( req, res, next, purchase.update  ) },
        delete  : ( req, res, next ) => { validate( req, res, next, purchase.delete  ) },
        listAll : ( req, res, next ) => { validate( req, res, next, purchase.listAll ) },
        listMy  : ( req, res, next ) => { validate( req, res, next, purchase.listMy  ) },
    },
}