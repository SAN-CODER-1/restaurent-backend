const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateUser = (req, res, next) => {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    // Check if token exists
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ 
            success: false,
            message: 'Access denied. No valid token provided.' 
        });
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user to request
        req.user = {
            id: decoded.userId,
            ...decoded.user // spread any other user properties
        };
        
        next();
    } catch (error) {
        // Handle different error cases
        let message = 'Invalid token';
        if (error.name === 'TokenExpiredError') {
            message = 'Token expired';
        } else if (error.name === 'JsonWebTokenError') {
            message = 'Invalid token';
        }
        
        return res.status(401).json({ 
            success: false,
            message 
        });
    }
};

module.exports = authenticateUser;