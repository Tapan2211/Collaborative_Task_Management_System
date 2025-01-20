const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized' });
        }
    } else {
        res.status(401).json({ message: 'No token, authorization denied' });
    }
};

module.exports = { protect };


// const JWT = require("jsonwebtoken");

// module.exports = async (req, res, next) => {
//     try {
//         const token = req.headers["authorization"].split(" ")[1];
//         JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
//             if (err) {
//                 return res.status(200).send({
//                     message: "Auth Fialed",
//                     success: false,
//                 });
//             } else {
//                 req.body.userId = decode.id;
//                 next();
//             }
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(401).send({
//             message: "Auth Failed",
//             success: false,
//         });
//     }
// };