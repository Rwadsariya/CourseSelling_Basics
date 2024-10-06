const jwt = require("jsonwebtoken");
const {JWT_USSER_TOKEN_SECRET} = require("../config");

function userMiddleware(req, res, next) {
    const token = req.headers.token;
    const decoded_token = jwt.verify(token,JWT_USSER_TOKEN_SECRET)

    if(decoded_token){
        req.userId = decoded_token.id;
        next()
    }else {
        res.status(401).json({
            message: "You are not signed in"
        })
    }
}

module.exports = {
    userMiddleware
}