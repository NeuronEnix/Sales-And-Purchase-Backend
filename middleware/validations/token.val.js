const Joi = require( '@hapi/joi' ) ;

const token = {
    refreshToken : Joi.forbidden(),
    accessToken  : Joi.forbidden(),
} ;

module.exports = { token };
