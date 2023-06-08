exports.allowOnlyLocalhostAndDomains = (req, res, next) => {
    const allowedOrigins = ['localhost:3004', '127.0.0.1:3004', 'http://yourdomain.com']; 

    const requestOrigin = req.headers.host;
  
    if (allowedOrigins.includes(requestOrigin)) {
      res.setHeader('Access-Control-Allow-Origin', requestOrigin);
      next();
    } else {
      res.status(403).json({ error: 'Unauthorized origin' });
    }
  };