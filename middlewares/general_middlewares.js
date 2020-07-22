const general_middlewares = {};

general_middlewares.checkBody = (req, res, next) => {
    if(isObjEmpty(req.body)) {
        console.log('Body cannot be empty');
        res.status(400).json({
            message: 'There was a problem with the information provided'
        });
    } else {
        next();
    }
};

//validateToken
//isTokenAdmin

function isObjEmpty(obj) {
    return Object.entries(obj).length === 0;
}

module.exports = general_middlewares;