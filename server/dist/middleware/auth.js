import jwt from "jsonwebtoken";
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        const user = typeof decoded === "object" && decoded !== null
            ? decoded
            : undefined;
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        if (user) {
            req.user = user; // Add user data to request object
            return next();
        }
        else {
            return res.sendStatus(403); // Forbidden
        }
    });
    return; // Ensure all code paths return a value
};
