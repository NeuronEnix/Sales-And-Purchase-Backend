const router = require( 'express' ).Router() ;
const purchase = require( './purchase.controller.js' ) ;
const { validator } = require( '../../validator.js' ) ;

router.get( '/list'       , validator.purchase.list      , purchase.list       ) ;
router.get( '/detail'     , validator.purchase.delete    , purchase.detail     ) ;
router.get( '/list-edits' , validator.purchase.listEdits , purchase.editDetail ) ;

router.post( '/create' , validator.purchase.create , purchase.create ) ;
router.post( '/update' , validator.purchase.update , purchase.update ) ;

router.post( '/delete' , validator.purchase.delete , purchase.delete  ) ;

module.exports.router = router ;