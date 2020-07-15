const users_middlewares = {};

users_middlewares.requireRegisterData = (req, res, next) => {
    const data;

    if(isObjEmpty) {
        console.log('Body cannot be empty');
        res.status(400).json({
            message: 'There was a problem with information provided'
        });
    }

    
};

users_middlewares.requireLoginData = (req, res, next) => {

};

function isObjEmpty(obj) {
    return Object.entries(obj).length === 0;
}

module.exports = users_middlewares;