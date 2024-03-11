export const disableCache = (req, res, next) => {
  res.set('Cache-Control', 'no-store'); // Set Cache-Control header to disable caching
  next(); // Call the next middleware in the stack
};

export default disableCache;