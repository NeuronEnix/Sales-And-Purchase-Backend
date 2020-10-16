module.exports.ok = ( resObj, data ) => {
    let res = {
        code : 0,
        data : data
    };
    console.log( { ID : resObj.ID, time : (Date.now() - resObj._TS) + "ms", res : res, } ) ;
    resObj.status( 200 ).send( res ) ;
}

module.exports.err = ( resObj, err ) => {
    let res ;
    try {
        if ( err.err.err ) 
            res = { code : err.err.code, err : err.err.err, info : err.info } ;
        else throw err ;
    } catch( error ) {
        if( err.type === 'entity.parse.failed' ) res = this.errData.jsonParseErr ;
        else res = this.errData.unknownErr ;
        console.log( err ) ;
    } finally {
        console.log( { ID : resObj.ID, time : (new Date() - resObj._TS) + "ms", res : res, } ) ;
        resObj.status( 400 ).send( res ) ;
    }
}
module.exports.errHandler = ( err, req, res, next ) => { console.log('LOL Happened');return this.err( res, err ) ; } ;
module.exports.errData = {

    unknownErr          : { code : -1 , err : 'Unknown Error!',           info : 'Unknown Error - Inform Developer Immediately!' },
    jsonParseErr        : { code : -2 , err : 'Incorrect JSON Structure', info : "Incorrect JSON Structure"                      },

    resNotFound         : { code : 1  , err : 'Resource Not Found'              },
    invalidToken        : { code : 2  , err : 'Invalid Token'                   },
    invalidCredential   : { code : 3  , err : 'Incorrect Credential'            },
    dbCommitErr         : { code : 4  , err : 'Error While Saving To Database'  },
    duplicateErr        : { code : 5  , err : 'Value Already Exist (Duplicate)' },
    validationErr       : { code : 6  , err : 'Validation Error'                },
    notEnoughStock      : { code : 7  , err : 'Not Enough Stock'                },
    AccessTokenExpired  : { code : 8  , err : 'Access Token Expired'            },
    RefreshTokenExpired : { code : 9  , err : 'Refresh Token Expired'           },
    unAuthorized        : { code : 10 , err : 'Not Authorized'                  },
    AccessTokenNotFound : { code : 11 , err : 'Access Token Not Found'          },
} ;

module.exports.defRes = ( resObj, apiName ) => {
    const res = { code : -1, status : 'FAILED', err : 'In Progress', api : apiName }
    console.log   ( { ID : resObj.ID, time : (Date.now() - resObj._TS) + "ms", res : res, } ) ;
    resObj.status ( 400 ).send( res ) ;
}