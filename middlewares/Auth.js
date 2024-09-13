const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token || (req.headers['Authorization'] && req.headers['Authorization'].split(' ')[1]);

        if (!token) {
            return res.status(401).json({ success: false, message: "Token is not provided!" });
        }

        const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!userData) {
            return res.status(401).json({ success: false, message: "You are not authenticate!" });
        }

        // set the userInfo in request
        req.user = userData;

        // call next middleware
        next();

    } catch (error) {
        console.log("Error ......! in isAuthentic controller", error.message);
        return res.status(500).json({
            success: true,
            message: "Not authentic user!",
            error: error.message
        });
    }
}

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        try {

            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ success: false, message: "user is not authorize for this role!" });
            }

            // call next middleware
            next();

        } catch (error) {
            console.log("Error ......! in isAuthorize controller", error.message);
            return res.status(500).json({
                success: true,
                message: "Not authorize user!",
                error: error.message
            });
        }
    }
}