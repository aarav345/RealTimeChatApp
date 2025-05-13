const {JWT_TOKEN_EXPIRATION_IN_DAYS} = process.env;

module.exports.secureCookieToken = (res, token) => {
    res.cookie("jwt", token, {
        maxAge: parseInt(JWT_TOKEN_EXPIRATION_IN_DAYS) * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevents from XSS attack
        sameSite: "strict", // prevents from csrf attacks
        secure: process.env.NODE_ENV === 'production',
    })
}

