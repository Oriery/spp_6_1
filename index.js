import express from 'express'
import path from 'path'
import {requestTime, logger} from './middlewares.js'
import serverRoutes from './routes/debts.js'

const __dirname = path.resolve()
const PORT = process.env.PORT ?? 3001
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'))

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(requestTime)
app.use(logger)

app.use(serverRoutes)

app.get('/', (req, res) => {
  res.render('index', {title: 'Main Page', active: 'main'})
})

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`)
})