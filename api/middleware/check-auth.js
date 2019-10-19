const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        //this verfies the token sent 
        //the jwt is made part of the body and passed via the body
        //then the key is called
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);

        req.farmerData = decoded;
        //next is set to continue
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
    next();
}