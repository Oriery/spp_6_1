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
  renderDebtsPage(res)
}

export const postDebt = (req, res) => {
  if (req.body.id) { setDebtStatus(req, res); return }

  const newDebt = {
    name: req.body.name,
    initAmount: req.body.amount,
    creditorUser_ID: '93b0598d-0fdb-441a-b3a5-f6da794d37eb'
  }
  
  axios.post('http://localhost:4004/user/Debts', newDebt)

  renderDebtsPage(res)
}

async function setDebtStatus (req, res) {
  const {status, id} = req.body

  const result = await axios.patch(`http://localhost:4004/user/Debts/${id}`, {status: convertStatusBack[status]})
  
  if (result.status === 200) {
    renderDebtsPage(res)
  } else {
    renderDebtsPage(res, {code: 404, message: 'Debt not found.'})
  }
} 

async function renderDebtsPage(res, error) {
  res.render('debts', {title: 'Debts', active: 'debts', debts: await getDebts(), error : error})
}

async function getDebts() {
  const response = await axios.get('http://localhost:4004/user/Debts')

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