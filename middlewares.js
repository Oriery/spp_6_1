export function requestTime(req, res, next) {
  req.requestTime = Date.now()
  next()
}

export function logger(req, res, next) {
  console.log(`Req.time: ${req.requestTime}`)
  next()
}