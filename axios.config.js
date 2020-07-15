require('dotenv').config() ;
const jwt = require('jsonwebtoken') ;
const axios = require( 'axios' ) ;
const { ACCESS_TOKEN_KEY , ACCESS_TOKEN_EXPIRY  } = process.env ;
let ReqID = 0  // --Dev
axios.defaults.baseURL = 'http://localhost:9999' ;
axios.defaults.withCredentials = true
axios.defaults.headers.common['Authorization'] = jwt.sign( {_id:'5f0dce9c70fec36225763576'}, ACCESS_TOKEN_KEY , { expiresIn : '1d'  } ) ; 
axios.interceptors.request.use( async req => {
    console.warn( `Request : ${( ++ReqID )}, url : ${req.url}` ) ; //-Dev 
    console.log( req.data  ) ;    //-Dev
    req.ResID = ReqID ; //-Dev
        // return await validate( req ) ;
        return req ;
    }, err =>  {
        return 
    });

axios.interceptors.response.use( 
    res => {
        console.warn( `Response : ${( res.config.ResID )}, url : ${res.config.url}` ) ; //-Dev 
        console.log( res.data ) ; //-Dev
        return res.data.data ;
    },
    async err =>  {
        console.log( 'Change auth........................................................change auth ')
        console.warn( `Response Error : ${ err.config.ResID } : ${ err.config.url }` ) ; //-Dev
        console.log( err.response.data  ) ; //-Dev
        switch ( err.response.data.code ) {
            case 2 :    // Token Invalid
            case 9 : {  // Refresh Token Expired
                // Code to Log out 
                // ...
                // store.dispatch(setCurrentUser(null));
                console.log( 'Logging Out') ; //-Dev
                return 
            }
            case 8 : { // Access Token Expired - Get new Access Token And Retry
                err.config.data = JSON.parse( new String( err.config.data  ) ) ;
                return await newAccessTokenAndRetry( err.config) ;
            }
            default : {
                console.log(`ErrInfo : ${err.response.data.info}` ) ;
                return ;
            }
        }
    });
const newAccessToken = async () => {
    const res = await axios.post( '/auth/access-token' ) ;
    axios.defaults.headers.common['Authorization'] = res.AccessToken ;
    return res.AccessToken ;
}
const newAccessTokenAndRetry = async prevReq => {
    try {
        console.log( prevReq.headers )
        prevReq.headers[ 'Authorization']  = await newAccessToken() ;
        return await axios.request( prevReq ) ;
    } catch ( err ) {
        console.log( 'caught ') //-Dev
        throw err ;
    }
}