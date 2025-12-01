const jwt = require('jsonwebtoken');
const User = require('../models/User');

const fs = require('fs');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            fs.appendFileSync('debug_auth.txt', `\n[${new Date().toISOString()}] Token found: ${token.substring(0, 10)}...\n`);
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            fs.appendFileSync('debug_auth.txt', `Decoded ID: ${decoded.id}\n`);

            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user) {
                fs.appendFileSync('debug_auth.txt', `User not found for ID: ${decoded.id}\n`);
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            fs.appendFileSync('debug_auth.txt', `User found: ${req.user.email}, Role: ${req.user.role}\n`);
            next();
        } catch (error) {
            fs.appendFileSync('debug_auth.txt', `Auth Error: ${error.message}\n`);
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        fs.appendFileSync('debug_auth.txt', `No token provided\n`);
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        fs.appendFileSync('debug_auth.txt', `Authorizing role. Required: ${roles}, User Role: ${req.user ? req.user.role : 'UNDEFINED'}\n`);
        
        if (!req.user) {
             return res.status(500).json({ message: 'User not found in authorize middleware' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `User role ${req.user.role} is not authorized to access this route` });
        }
        next();
    };
};

module.exports = { protect, authorize };
