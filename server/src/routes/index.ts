import express from 'express'
import authRoutes from './auth.routes'
import paymentsRoutes from './payments.routes'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/payments', paymentsRoutes)

export default router