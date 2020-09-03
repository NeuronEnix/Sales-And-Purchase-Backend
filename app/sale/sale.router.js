const router = require( 'express' ).Router() ;
const sale   = require( './sale.controller.js' ) ;
const validate = require( '../../validator.js' ) ;

router.get( '/detail'      , sale.detail  ) ;
router.get( '/edit-detail' , sale.editDetail  ) ;
router.get( '/list'        , sale.list  ) ;

router.post( '/create'  , validate.sale.create  , sale.create  ) ;
router.post( '/update'  , validate.sale.update  , sale.update  ) ;

router.delete( '/delete' , sale.delete  ) ;

module.exports.router = router ;