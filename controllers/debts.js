import axios from 'axios'

const convertStatus = {
  0: 'pending',
  1: 'paid',
  2: 'cancelled'
}
const convertStatusBack = {
  pending: '0',
  paid: '1',
  cancelled: '2'
}

export const debtsPage = (req, res) => {
  renderDebtsPage(req, res)
}

export const postDebt = (req, res) => {
  if (req.body.id) { setDebtStatus(req, res); return }

  const newDebt = {
    name: (req.body.iOwe === '1' ? `I owe to ${req.body.person}` : `${req.body.person} owes to me`) + ' - ' + (req.body.name.length ? req.body.name : 'no comment for debt'),
    initAmount: req.body.amount,
    currency_code: req.body.currency,
    creditorUser_ID: '93b0598d-0fdb-441a-b3a5-f6da794d37eb'
  }
  
  axios.post('http://localhost:4004/user/Debts', newDebt)

  renderDebtsPage(req, res)
}

async function setDebtStatus (req, res) {
  const {status, id} = req.body

  const result = await axios.patch(`http://localhost:4004/user/Debts/${id}`, {status: convertStatusBack[status]})
  
  if (result.status === 200) {
    renderDebtsPage(req, res)
  } else {
    renderDebtsPage(req, res, {code: 404, message: 'Debt not found.'})
  }
} 

async function renderDebtsPage(req, res, error) {
  res.render('debts', {
    title: 'Debts', 
    active: 'debts', 
    debts: await getDebts(req), 
    error : error,
    currency: req.body.currency || 'BYN',
    showingAllDebts: req.query.all
  })
}

async function getDebts(req) {
  const response = await axios.get(`http://localhost:4004/user/Debts?${req.query.all ? '' : "$filter=status eq '0'"}`)

  let debts = response.data.value
  // convert to right format
  debts = debts.map(debt => {
    debt.id = debt.ID,
    debt.amount = debt.initAmount
    debt.status = convertStatus[debt.status]

    return debt
  })

  return debts
}