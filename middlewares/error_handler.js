function errorHandler(err, req, res, next) {
  let status = err.status || 500
  let message = err.message || 'something went wrong'
  console.log(err)
  res.status(status).json({ message })
}

module.exports = errorHandler