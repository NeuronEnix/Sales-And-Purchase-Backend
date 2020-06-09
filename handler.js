function send( resObj, resCode, data ){
    let res;
    if( resCode === 200 ){
        res = {
            code : 0,
            status : 'OK',
            data : data
        } ;
    }
    else{
        res = {
            code : data.code,
            status : 'FAILED',
            msg : data.msg
        } ;
    }
    resObj.status( resCode ).send( res ) ;
}

errData = {
    invalidReq : {
        code : 1,
        msg : 'invalid request'
    },
    invalidCredential :{
        code : 2,
        msg : 'incorrect user name or pass'
    },
    missingField : {
        code : 3,
        msg : 'Required Field Missing'
    },
    dupEmail : {
        code : 4,
        msg : 'Email already Exists'
    }
} ;

module.exports.send = send
module.exports.errData = errData