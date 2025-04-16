// // middlewares/authenticateToken.js

// import jwt from "jsonwebtoken";

// const authenticateToken = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) return res.status(401).json({ message: "Unauthorized: No token" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { id, role }
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Forbidden: Invalid token" });
//   }
// };

// export default authenticateToken;
