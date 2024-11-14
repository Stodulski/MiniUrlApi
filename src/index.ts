import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'

import router from './routes/main'

import connectDB from './db'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())

connectDB()

const port: number =
  !isNaN(Number(process.env.PORT)) && Number(process.env.PORT) !== 0
    ? Number(process.env.PORT)
    : 3000

app.use(router)

app.listen(port, (): void => {
  console.log(`Server start at port ${port}`)
})

export default app
