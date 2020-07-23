const router = require( 'express' ).Router() ;
const purchase = require( './purchase.controller.js' ) ;
const validate = require( '../../validator.js' ) ;

router.post( '/create' , validate.purchase.create ,  purchase.create ) ;
router.post( '/detail' , purchase.detail  ) ;
router.post( '/update' , purchase.update  ) ;
router.post( '/delete' , purchase.delete  ) ;
router.post( '/listMy' , purchase.listMy  ) ;
router.post( '/listAll', purchase.listAll ) ;

module.exports.router = router