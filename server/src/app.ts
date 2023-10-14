import express from 'express'
import './db'
import routes from './routes'

const app = express()
app.use(express.urlencoded({ extended: false }))


app.use('/api', routes)

export default app