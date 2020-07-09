module.exports.ok = ( resObj, data ) => {
    let res = {
        code : 0,
        data : data
    };
    console.log( { ID : resObj.ID, time : (Date.now() - resObj.TS) + "ms", res : res, } ) ;
    resObj.status( 200 ).send( res ) ;
}

module.exports.err = ( resObj, err ) => {
    let res ;
    try {
        if ( err.err.err ) 
            res = { code : err.err.code, err : err.err.err, info : err.info } ;
        else throw err ;
    } catch( error ) {
        res = this.errData.unknownErr ;
        console.log( err ) ;
    } finally {
        console.log( { ID : resObj.ID, time : (Date.now() - resObj.TS) + "ms", res : res, } ) ;
        resObj.status( 400 ).send( res ) ;
    }
}

module.exports.errData = {
    unknownErr          : { code : -1 , err : 'Unknown Error!'                  },
    resNotFound         : { code : 1  , err : 'Resource Not Found'              },
    invalidToken        : { code : 2  , err : 'Invalid Token'                   },
    invalidCredential   : { code : 3  , err : 'Incorrect Credential'            },
    dbCommitErr         : { code : 4  , err : 'Error While Saving To Database'  },
    duplicateErr        : { code : 5  , err : 'Value Already Exist (Duplicate)' },
    validationErr       : { code : 6  , err : 'Validation Error'                },
    outOfStock          : { code : 7  , err : 'Not Enough Stock'                },
} ;

module.exports.defRes = ( resObj, apiName ) => {
    const res = { code : -1, status : 'FAILED', err : 'In Progress', api : apiName }
    console.log( { ID : resObj.ID, time : (Date.now() - resObj.TS) + "ms", res : res, } ) ;
    resObj.status( 400 ).send( res ) ;
}