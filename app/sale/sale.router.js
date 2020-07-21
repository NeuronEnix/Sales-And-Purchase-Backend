const router = require( 'express' ).Router() ;
const sale   = require( './sale.controller.js' ) ;
const validate = require( '../../validator.js' ) ;

router.post( '/create' , validate.sale.create , sale.create ) ;
router.post( '/detail' , sale.detail ) ;
router.get ( '/listMy' , sale.listMy  ) ;
router.get ( '/listAll', sale.listAll ) ;

module.exports.router = router