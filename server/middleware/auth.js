// server/middleware/auth.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

module.exports = function(req, res, next) {
  // 1. Verify JWT_SECRET is properly loaded
  if (!JWT_SECRET || JWT_SECRET === 'your_jwt_secret_fallback') {
    console.error('FATAL: Invalid JWT_SECRET configuration');
    return res.status(500).json({
      error: 'Server configuration error',
      code: 'INVALID_JWT_CONFIG'
    });
  }

  // 2. Get token from all possible sources
  const token = (
    req.header('Authorization')?.replace(/^Bearer\s+/i, '') || 
    req.cookies?.token || 
    req.query?.token
  )?.trim();

  // 3. Validate token exists
  if (!token) {
    return res.status(401).json({
      error: 'Authentication required',
      code: 'MISSING_TOKEN'
    });
  }

  // 4. Verify token with enhanced checks
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
      complete: true  // Get full token header/payload
    });

    // 5. Additional payload validation
    if (!decoded.payload?.userId) {
      throw new jwt.JsonWebTokenError('Missing userId in token');
    }

    // 6. Attach to request
    req.userId = decoded.payload.userId;
    next();

  } catch (err) {
    console.error('JWT Verification Failed:', {
      error: err.name,
      reason: err.message,
      secretLength: JWT_SECRET.length,
      tokenHeader: token.split('.')[0]
    });

    const response = {
      error: 'Authentication failed',
      code: 'INVALID_TOKEN',
      reason: err.message.includes('signature') ? 
        'Token verification failed' : 
        err.message
    };

    if (err.name === 'TokenExpiredError') {
      response.code = 'TOKEN_EXPIRED';
      response.error = 'Session expired';
    }

    return res.status(401).json(response);
  }
};