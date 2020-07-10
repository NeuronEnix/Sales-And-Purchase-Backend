module.exports.config = () => {
    module.exports._validator = {
        User : {
            _email    : { min: 1, max : 10 },
            _pass     : { min: 1, max : 10 },
            _fullName : { min: 1, max : 10 },
            _type     : { min: 1, max : 1  },
        },
        Item : {
            _name : { min : 1, max : 10 },
            _unit : { min : 1, max : 10 },
        },
        Seller : {
            _name : { min : 1, max : 10 },
        }
    }
}