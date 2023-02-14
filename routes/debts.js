import {Router} from 'express'
import {createDebt, setDebtStatus, debtsPage} from '../controllers/debts.js'
const router = Router()

router.get('/debts', debtsPage)

router.post('/debts', createDebt)

router.patch('/debts/:id', setDebtStatus)

export default router
