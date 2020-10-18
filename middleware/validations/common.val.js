const Joi = require( '@hapi/joi' ) ;
const { itemSchema } = require('./item.val');

const commonSchema = {
    _id : Joi.string().length(24),
    itemNameQtyPair: Joi.object().pattern( itemSchema.name, itemSchema.qty ).required(),
    pageNo : Joi.number().min(0).max(100).required(),
}

module.exports = { commonSchema };
