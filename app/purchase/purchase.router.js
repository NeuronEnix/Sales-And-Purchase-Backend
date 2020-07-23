const router = require( 'express' ).Router() ;
const purchase = require( './purchase.controller.js' ) ;
const validate = require( '../../validator.js' ) ;

router.post( '/create' , validate.purchase.create ,  purchase.create ) ;
router.post( '/detail' , purchase.detail  ) ;
router.post( '/update' , purchase.update  ) ;
router.post( '/delete' , purchase.delete  ) ;
router.post( '/list-my' , purchase.listMy  ) ;
router.post( '/list-all', purchase.listAll ) ;

module.exports.router = router