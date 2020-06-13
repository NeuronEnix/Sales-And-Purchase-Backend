const Item = require( './item.model.js' ) ;
const respond = require( '../../response.js' ) ;
const errData = require( '../../response.js'  ).errData

module.exports.search = ( req, res ) => {
    console.log( { reqQuery :  req.query.i } )
    const item = req.query.i ;
    Item.find(
        { Name : { $regex : new RegExp( item ) } },
        { _id : 0, Name : 1 } ,
        function matchedResult ( err, data ) {
            if( err ) {
                console.log( 'Error while matching' ) ;
                return respond.err( res, errData.itemMatchErr ) ;
            }else{
                return respond.ok( res, data ) ;
            }
        }
    ).limit( 10 ) ;
}

module.exports.list = async ( req, res ) => {
    const { skip, limit } = req.body 
    try{
        const itemList = await Item.find(
                                {},
                                { _id : 0, Name : 1, Unit : 1, Qty : 1 }
                            )
                            .skip( skip )
                            .limit( limit ) ;
        console.log( { ItemFetched : [skip,limit] }  ) ;
        return respond.ok( res, itemList ) ;
    } catch( err ) {
        console.log( 'Item fetch err ' ) ;
        return respond.err( res, errData.itemFetchErr ) ;
    }
}

module.exports.add = async ( req, res ) => {
    const item = new Item() ;
    Object.assign( item, req.body ) ;
    try{
        await item.save() ;
        console.log( 'Items saved : ' ) ;
        console.log( item ) ;
        respond.ok( res ) ;
    } catch( err ) {
        console.log( 'Error : Item not saved' ) ;
        for ( field in err.errors ) {
            console.log( field ) ;
        }
        if( err.name === 'ValidationError' ) {
            console.log( 'ValidationError : ') ;
            for ( field in err.errors ) {
                console.log( field ) ;
            }
            return respond.err( res, errData.validationErr ) ;
        } else {
            console.log( 'Dup Item' )
            return respond.err( res, errData.dupItem ) ;
        }
    }
}

module.exports.detail = async ( req, res ) => {
    try{
        const item = await Item.detail( req.body.Name ) ;
        respond.ok( res, item ) ;
    } catch( err ) {
        respond.err( res, err ) ;
    }
}

module.exports.update = ( req, res ) => {
    respond.defRes( res ,'update()' ) ;
}

module.exports.delete = ( req, res ) => {
    respond.defRes( res, 'delete()' ) ;
}