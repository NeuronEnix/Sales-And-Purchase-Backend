const respond = require( './response.js' ) ;
const errData = respond.errData ;

const { user, item, seller, purchase, sale } = require( './validator.config.js' ) ;

const validator = async ( req, res, next, schema ) => {
    try { await schema.validateAsync( req.body ) ; return next() ; }
    catch ( err ) { return respond.err( res, { err : errData.validationErr, info : err.details[0].message } ) ; }
} ;

module.exports = {

    user : {
        login  : ( req, res, next ) => { validator( req, res, next, user.login  ) },
        logout : ( req, res, next ) => { validator( req, res, next, user.logout ) },
        signup : ( req, res, next ) => { validator( req, res, next, user.signup ) },
    }, 

    item : {
        add    : ( req, res, next ) => { validator( req, res, next, item.add    ) },
        search : ( req, res, next ) => { validator( req, res, next, item.search ) },
        detail : ( req, res, next ) => { validator( req, res, next, item.detail ) },
        update : ( req, res, next ) => { validator( req, res, next, item.update ) },
    },

    seller : {
        add    : ( req, res, next ) => { validator( req, res, next, seller.add    ) },
        search : ( req, res, next ) => { validator( req, res, next, seller.search ) },
    },

    sale : {
        create  : ( req, res, next ) => { validator( req, res, next, sale.create  ) },
        listAll : ( req, res, next ) => { validator( req, res, next, sale.listAll ) },
        listMy  : ( req, res, next ) => { validator( req, res, next, sale.listMy  ) },
    },

    purchase : {
        create  : ( req, res, next ) => { validator( req, res, next, purchase.create  ) },
        update  : ( req, res, next ) => { validator( req, res, next, purchase.update  ) },
        delete  : ( req, res, next ) => { validator( req, res, next, purchase.delete  ) },
        listAll : ( req, res, next ) => { validator( req, res, next, purchase.listAll ) },
        listMy  : ( req, res, next ) => { validator( req, res, next, purchase.listMy  ) },
    },
}