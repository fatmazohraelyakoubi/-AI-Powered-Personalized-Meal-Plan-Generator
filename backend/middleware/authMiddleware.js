import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "لا يوجد توكن، المصادقة مرفوضة" });
    }

    const token = authHeader.split(" ")[1]; // استخراج التوكن

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "توكن غير صالح" });
    }
};

export default authMiddleware;
