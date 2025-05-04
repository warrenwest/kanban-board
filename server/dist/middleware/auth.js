import jwt from "jsonwebtoken";
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        const user = decoded;
        req.user = user;
        next();
        return; // Ensure this path explicitly returns
    });
    return; // Add this return to cover all code paths
    // The user is already added to the request object in the callback above.
};
