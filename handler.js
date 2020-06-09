module.exports.send = ( resObj, resCode, data ) => {
    let res;
    if( resCode === 200 ) res = { code : 0,         status : 'OK',     data : data      } ;
    else                  res = { code : data.code, status : 'FAILED', msg  : data.msg  } ;
    resObj.status( resCode ).send( res ) ;
}

module.exports.errData = {
    invalidReq          : { code : 1, msg : 'Invalid request'               },
    invalidCredential   : { code : 2, msg : 'Incorrect user name or pass'   },
    missingField        : { code : 3, msg : 'Required Field Missing'        },
    dupEmail            : { code : 4, msg : 'Email already Exists'          }
} ;

module.exports.defRes = ( resObj, apiName ) => {
    resObj.status( 400 ).send( { code : -1, status : 'FAILED', msg : 'In Progress', api : apiName } ) ;
}