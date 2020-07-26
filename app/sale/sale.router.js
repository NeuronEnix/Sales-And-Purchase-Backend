const router = require( 'express' ).Router() ;
const sale   = require( './sale.controller.js' ) ;
const validate = require( '../../validator.js' ) ;

router.post( '/create'  , validate.sale.create  , sale.create  ) ;
router.post( '/detail'  , validate.sale.detail  , sale.detail  ) ;
router.post( '/update'  , validate.sale.update  , sale.update  ) ;
router.post( '/delete'  , validate.sale.delete  , sale.delete  ) ;
router.post( '/list-my' , validate.sale.listMy  , sale.listMy  ) ;
router.post( '/list-all', validate.sale.listAll , sale.listAll ) ;

module.exports.router = router ;