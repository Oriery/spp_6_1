import c from 'colors'

export function requestTime(req, res, next) {
  req.requestTime = Date.now()
  next()
}

export function logger(req, res, next) {
  console.log(`${c.grey(new Date(req.requestTime).toLocaleString()+':')} ${c.green(req.method)} ${req.url}`)
  if (req.body && Object.keys(req.body).length !== 0) console.log(req.body)
  next()
}