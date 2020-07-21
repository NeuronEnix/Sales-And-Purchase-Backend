const router = require( 'express' ).Router() ;
const purchase = require( './purchase.controller.js' ) ;
const validate = require( '../../validator.js' ) ;

router.post( '/create' , validate.purchase.create ,  purchase.create ) ;
router.post( '/detail' , purchase.detail ) ;
router.get ( '/listMy' , purchase.listMy  ) ;
router.get ( '/listAll', purchase.listAll ) ;

module.exports.router = router