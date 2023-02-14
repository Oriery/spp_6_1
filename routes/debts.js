import {Router} from 'express'
import {postDebt, debtsPage} from '../controllers/debts.js'
const router = Router()

router.get('/debts', debtsPage)

router.post('/debts', postDebt)

export default router
