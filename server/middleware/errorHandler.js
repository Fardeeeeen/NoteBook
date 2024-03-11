// errorHandler.js

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Check if the error is a custom error with a defined status code
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Handle Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map((error) => error.message);
    return res.status(400).json({ message: 'Validation error', errors });
  }

  // Handle other types of errors
  return res.status(500).json({ message: 'Internal server error' });
};
