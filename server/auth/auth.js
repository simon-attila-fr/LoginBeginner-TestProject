const jwt = require("jsonwebtoken");

const verifyAdminJWT = (req, res, next) => {
    try {

        // <<<< AUTH with Authorization + Bearer Http Header >>>>

        // const authorizationHeader = req.get("Authorization");

        // if (!authorizationHeader) {
        //     return res.send("Authorization header missing.")
        // }


        // const [type, token] = authorizationHeader.split(" ");

        // if (type !== "Bearer") {
        //     return res.send("Wrong authorization header type.")
        // }

        // req.payload = jwt.verify(token, process.env.JWT_SECRET);
        // next();



        // <<<< AUTH with cookie >>>>

        const token = req.cookies.access_token;
        if (!token) {
            return res.send("Please sign in!");
        }
        
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            if (!data.status){
                return res.send("Internal error: status doesn't exist in the batabase.")
            }
            if (data.status !== "admin") {
                return res.send("Access denied. Area restricted for admins.")
            }
            req.adminId = data.id;
            return next()
        } catch {
            return res.sendStatus(401);
        }

    } catch (err) {
        console.error(err);
        res.sendStatus(401);
    }
};

module.exports = {
    verifyAdminJWT,
};
