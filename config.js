require('dotenv').config()

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
const JWT_ADMIN_TOKEN_SECRET = process.env.JWT_ADMIN_TOKEN_SECRET


module.exports = {
    JWT_TOKEN_SECRET,
    JWT_ADMIN_TOKEN_SECRET
}