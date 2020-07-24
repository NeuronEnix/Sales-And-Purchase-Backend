const router = require( 'express' ).Router() ;
const sale   = require( './sale.controller.js' ) ;
const validate = require( '../../validator.js' ) ;

router.post( '/create'  , validate.sale.create , sale.create ) ;
router.post( '/detail'  , sale.detail  ) ;
router.post( '/update'  , sale.update  ) ;
router.post( '/delete'  , sale.delete  ) ;
router.post( '/list-my' , sale.listMy  ) ;
router.post( '/list-all', sale.listAll ) ;

module.exports.router = router ;