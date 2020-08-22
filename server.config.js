module.exports.CONFIG = {

    DB : {
        URL : "mongodb://localhost:27017/sap",
    },

    SERVER : {
        PORT : 9999,
    },

    BCRYPT : {
        ROUNDS : 10,
    },

    ACCESSIBLE_URL : {
        NON_ADMIN_URL : new Set( [ '/item', '/sale/create', '/sale/update', '/sale/list' ] ),
        NO_TOKEN_REQUIRED_URL : new Set( [ '/user/login', '/token/access-token', '/token/refresh-token', '/user/logout' ] )
    },
    
    TOKEN : {

        REFRESH_TOKEN : {
            KEY : "ADD_REFRESH_TOKEN_KEY",
            EXPIRY : "2d",
            MAX_AGE : 2 * 24 * 60 * 60 * 100,
        },
    
        ACCESS_TOKEN : {
            KEY : "ADD_ACCESS_TOKEN_KEY",
            EXPIRY : "2d",
        },

    }
}

module.exports.DB_LIMITER = {
    PURCHASE : {
        LIST : 10,
    },

    SALE : {
        LIST : 10,
    },
}
