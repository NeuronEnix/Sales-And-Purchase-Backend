module.exports.ok = ( resObj, data ) => {
    let res = {
        code : 0,
        status : 'OK',
        data : data
    };
    console.log( { res: res } ) ;
    resObj.status( 200 ).send( res ) ;
}

module.exports.err = ( resObj, err ) => {
    let res = {
        code : err.code,
        status : 'FAILED',
        msg : err.msg
    };
    console.log( { res: res } ) ;
    resObj.status( 400 ).send( res ) ;
}

module.exports.errData = {
    invalidReq          : { code : 1  , msg : 'Invalid request'              },
    invalidCredential   : { code : 2  , msg : 'Incorrect user name or pass'  },
    missingField        : { code : 3  , msg : 'Required Field Missing'       },
    dupEmail            : { code : 4  , msg : 'Email already Exists'         },
    invalidToken        : { code : 5  , msg : 'Invalid Token'                },
    dupItem             : { code : 6  , msg : 'Item already Exists'          },
    signupErr           : { code : 7  , msg : 'Error while saving to db'     },
    validationErr       : { code : 8  , msg : 'Validation Error'             },
    tokenErr            : { code : 9  , msg : 'Token generation failed'      },
    dbCommitErr         : { code : 10 , msg : 'Failed to save to DB'         },
    addItemErr          : { code : 11 , msg : 'Failed to add Item'           },
    itemMatchErr        : { code : 12 , msg : 'Error while matching item'    },
    itemFetchErr        : { code : 13 , msg : 'Error while fetching item'    },
} ;

module.exports.defRes = ( resObj, apiName ) => {
    const res = { code : -1, status : 'FAILED', msg : 'In Progress', api : apiName }
    console.log( { res: res } ) ;
    resObj.status( 400 ).send( res ) ;
}