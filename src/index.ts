import dotenv from 'dotenv'
import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import moment from 'moment-timezone'
import bodyParser from 'body-parser'
import databaseService from './services/database.service'
// import '~/utils/fake'

import { Router } from 'express'
import { UPLOAD_VIDEO_DIR } from '~/constants/dir'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { ObjectId } from 'mongodb'
import { defaultErrorHandler } from '~/middleware/error.middlewares'
import userRouter from '~/routes/users.routes'
import blogRouter from '~/routes/blog.routes'
import blogPromotionRouter from '~/routes/blogPromotion.routes'
import serviceRouter from '~/routes/service.routes'
import appointmentRouter from '~/routes/appointment.routes'
import contactRouter from '~/routes/contact.routes'
import homeRouter from '~/routes/home.routes'
import introRouter from '~/routes/intro.routes'
import posterRouter from '~/routes/poster.routes'
import priceServiceRouter from '~/routes/priceService.routes'
import categoryRouter from '~/routes/category.routes'

const router = Router()

const PORT = process.env.PORT || 4000

dotenv.config()
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Bangkok')
moment.tz.setDefault('Asia/Bangkok')

// connectDB()
// databaseService.connect().then(() => {
//   // databaseService.indexBlogs()
//   // databaseService.indexBlogPromotions()
//   // databaseService.indexAppointments()
//   // databaseService.indexContacts()
//   // databaseService.indexServices()
// })
databaseService
  .connect()
  .then(() => {
    databaseService.indexBlogs()
    databaseService.indexBlogPromotions()
    databaseService.indexServices()
    console.log('✅ Connected to MongoDB')
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err)
    process.exit(1)
  })
const app = express()
// app.use(cors())
// app.use(
//   cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
//   })
// )
const whitelist = ['https://duc-huy-user-sua-xe.vercel.app/']
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
)
// initFolder()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('trust proxy', 1)
app.use(express.json({ limit: '4mb' }))

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'", 'https:'],
//         scriptSrc: ["'self'", 'https:', "'unsafe-inline'"],
//         styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
//         imgSrc: ["'self'", 'data:', 'https:'],
//         connectSrc: ["'self'", 'https:'],
//         fontSrc: ["'self'", 'https:', 'data:'],
//         objectSrc: ["'none'"],
//         upgradeInsecureRequests: []
//       }
//     }
//   })
// )
app.use(helmet())
app.use(
  logger('dev', {
    skip: (req: Request) => req.url.indexOf('socket') >= 0
  })
)

// Root route
app.get('/', (_, res: Response) => {
  res.send('Web server is running')
})

app.use('/api/admin', userRouter)
app.use('/api/admin/home', homeRouter)
app.use('/api/admin/blogs', blogRouter)
app.use('/api/admin/promotion', blogPromotionRouter)
app.use('/api/admin/services', serviceRouter)
app.use('/api/admin/category', categoryRouter)
app.use('/api/admin/appointments', appointmentRouter)
app.use('/api/admin/contact', contactRouter)
app.use('/api/admin/intro', introRouter)
app.use('/api/admin/poster', posterRouter)
app.use('/api/admin/price-services', priceServiceRouter)
app.use(defaultErrorHandler)

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: true
  }
})

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
