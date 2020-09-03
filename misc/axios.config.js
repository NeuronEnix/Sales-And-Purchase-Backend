require( 'dotenv' ).config() ; // Configures env vars ;
const axios = require( 'axios' ) ;
const ResTime = []
let ReqID = 0  // --deb
axios.defaults.baseURL = 'http://localhost:9999' ;
// axios.defaults.baseURL = 'http://192.168.225.4:9999' ;
axios.defaults.withCredentials = true



axios.interceptors.request.use( async req => {
    console.log( `Request : ${( ++ReqID )}, url : ${req.url}` ) ; //-deb 
    console.log( req.data  ) ;    //-deb
    req.ResID = ReqID ; //-deb
    req.ReqTS = Date.now() ;
    return req;
    }, err =>  {
        return Promise.reject( err );
    })

axios.interceptors.response.use( 
    res => {
        ResTime.push( Date.now() - res.config.ReqTS ) ;
        console.warn( `Response : ${( res.config.ResID )}, url : ${res.config.url}` ) ; //-deb 
        console.log( res.data ) ; //-deb
        return res.data.data ;
    },
    async err =>  {
        
        console.warn( `Response Error : ${ err.config.ResID } : ${ err.config.url }` ) ; //-deb
        console.log( err.response.data  ) ; //-deb
        switch ( err.response.data.code ) {

            case 2 : // Token Invalid
            case 4 : // Refresh Token Expired
                // req.user.signOut();
                console.log( 'Logging Out') ; //-deb
                break;

            case 3 : // Access Token Expired - Get new Access Token And Retry
                // const failedReq = err.config ;
                // return await req.auth.accessToken( failedReq ) ;

            default : 
                if ( err.response.data.info ) console.log( err.response.data.info ) ;
        }
        return Promise.reject( err.response.data  ) ;
    });
    
    module.exports.ResTS = ResTime ;