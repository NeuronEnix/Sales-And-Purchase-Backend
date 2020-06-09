const Item = require( './item.model.js' ) ;
const handler = require( '../../handler.js' ) ;

module.exports.list = ( req, res ) => {
    handler.defRes( res, 'list()' ) ;
}

module.exports.add = ( req, res ) => {
    handler.defRes( res, 'add()' ) ; 
}

module.exports.update = ( req, res ) => {
    handler.defRes( res ,'update()' ) ;
}

module.exports.delete = ( req, res ) => {
    handler.defRes( res, 'delete()' ) ;
}