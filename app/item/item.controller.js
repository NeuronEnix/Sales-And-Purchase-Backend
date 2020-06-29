const Item = require( './item.model.js' ) ;
const respond = require( '../../response.js' ) ;
const errData = respond.errData ;

module.exports.add = async ( req, res ) => {
    try {
        req.body.UserID = req.user._id ;
        const itemData = req.body ;
        await Item.AddNewItem( itemData ) ;
        respond.ok( res ) ;
    } catch ( err ) {
        respond.err( res, err ) ;
    }
}

module.exports.update = async ( req, res ) => {
    try{
        req.body.UserID = req.user._id ;
        const itemData  = req.body ;
        await Item.Update( itemData ) ;
        respond.ok( res ) ;
    } catch( err ) {
        respond.err( res, err ) ;
    }
}

module.exports.detail = async ( req, res ) => {
    try{
        const itemName = req.body.Name ;
        const item = await Item.Detail( itemName ) ;
        respond.ok( res, item ) ;
    } catch( err ) {
        respond.err( res, err ) ;
    }
}

module.exports.search = ( req, res ) => {
    console.log( { reqQuery :  req.query.s } ) ;
    const item = req.query.s ;
    if( !item ) return respond.ok( res, [] ) ;
    Item.find(
        { Name : { $regex : new RegExp( item ) } },
        { _id : 0, Name : 1 } ,
        function matchedResult ( err, data ) {
            if ( err ) {
                return respond.err( res, { err : errData.itemMatchErr } ) ;
            } else {
                return respond.ok( res, data ) ;
            }
        }
    ).limit( 10 ) ;
}




