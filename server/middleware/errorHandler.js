const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // MySQL errors
  if (err.sqlMessage) {
    let userMessage = 'A database error occurred.';
    let status = 400;
    
    if (err.code === 'ER_DUP_ENTRY') {
      userMessage = 'A record with this value already exists.';
      status = 409;
    } else if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.code === 'ER_ROW_IS_REFERENCED_2') {
      userMessage = 'Referenced record does not exist or is in use.';
    }
    
    return res.status(status).json({ error: userMessage });
  }

  // Validation errors from express-validator
  if (err.type === 'validation') {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.errors
    });
  }

  // Default server error
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
};

module.exports = errorHandler;
